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

## Production deployment

Deploy the `Client` and `Server` as separate applications, or configure the hosting platform to route `/auth` and the API routes to the Express server. Replace the example URLs below with your real deployment URLs.

### Client environment variables

Set this variable in the frontend hosting project before rebuilding:

`VITE_API_URL=https://your-api-domain.example.com`

If this variable is missing, the frontend intentionally falls back to `http://localhost:5000`.

### Server environment variables

Set these variables in the backend hosting project:

```text
CLIENT_URL=https://gymone-react.vercel.app
GOOGLE_REDIRECT_URI=https://your-api-domain.example.com/auth/google/callback
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=replace-with-a-long-random-secret
```

In Google Cloud Console, add exactly these production URLs to the OAuth client:

- Authorized JavaScript origin: `https://gymone-react.vercel.app`
- Authorized redirect URI: `https://your-api-domain.example.com/auth/google/callback`

The redirect URI must be the backend URL and must end with `/auth/google/callback`. Do not use the frontend URL for the redirect URI, and remove the localhost URI when testing production.

The Google client secret stays on the server. The browser only receives an HTTP-only session cookie after Google verifies the account.