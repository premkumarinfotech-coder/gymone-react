# Google OAuth setup

1. Create or select a project in [Google Cloud Console](https://console.cloud.google.com/).
2. Configure the OAuth consent screen and add the Google accounts that may test the app.
3. Create an OAuth 2.0 Web application client.
4. Add this authorized JavaScript origin:
   `http://localhost:5173`
5. Add this authorized redirect URI:
   `http://localhost:5000/auth/google/callback`
6. Copy `Server/.env.example` to `Server/.env` and fill in the Google client ID, client secret, and a long random session secret.
7. Restart the server with `npm start --prefix Server`.

The Google client secret stays on the server. The browser only receives an HTTP-only session cookie after Google verifies the account.