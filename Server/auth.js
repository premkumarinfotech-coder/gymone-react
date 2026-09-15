const crypto = require('crypto');
const express = require('express');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();

function getOAuthClient() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
    return null;
  }

  return new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
}

router.get('/google', (req, res) => {
  const client = getOAuthClient();
  if (!client) {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientUrl}/login?error=oauth_not_configured`);
  }

  const state = crypto.randomBytes(24).toString('hex');
  req.session.oauthState = state;
  const authorizationUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'email', 'profile'],
    state,
    prompt: 'select_account'
  });

  return res.redirect(authorizationUrl);
});

router.get('/google/callback', async (req, res) => {
  const client = getOAuthClient();
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

  if (!client) {
    return res.redirect(`${clientUrl}/login?error=oauth_not_configured`);
  }

  if (!req.query.state || req.query.state !== req.session.oauthState) {
    return res.redirect(`${clientUrl}/login?error=invalid_oauth_state`);
  }

  delete req.session.oauthState;

  try {
    const { tokens } = await client.getToken(req.query.code);
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();

    if (!payload.email || payload.email_verified !== true) {
      return res.redirect(`${clientUrl}/login?error=email_not_verified`);
    }

    req.session.user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name || payload.email,
      picture: payload.picture || null
    };

    return res.redirect(clientUrl);
  } catch (error) {
    console.error('Google OAuth callback failed:', error.message);
    return res.redirect(`${clientUrl}/login?error=oauth_failed`);
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ authenticated: false });
  }

  return res.json({ authenticated: true, user: req.session.user });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('gymone.sid');
    res.status(204).end();
  });
});

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  return next();
}

module.exports = { router, requireAuth };