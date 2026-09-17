const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { router: authRouter, requireAuth } = require('./auth');

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
  name: 'gymone.sid',
  secret: process.env.SESSION_SECRET || 'development-only-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 8
  }
}));

app.use('/auth', authRouter);

// API routes
app.use('/members', requireAuth, require('./routes/members'));
app.use('/payments', requireAuth, require('./routes/payments'));
app.use('/plans', requireAuth, require('./routes/plans'));
app.use('/renewals', requireAuth, require('./routes/renewals'));
app.use('/reports', requireAuth, require('./routes/reports'));

// Serve React build (production)
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
