const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
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

// Serve the React build only when it is included in this deployment.
const clientDist = path.join(__dirname, '../Client/dist');
if (fs.existsSync(path.join(clientDist, 'index.html'))) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')));
} else {
  app.get('*', (req, res) => res.status(404).json({ error: 'Route not found.' }));
}

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
