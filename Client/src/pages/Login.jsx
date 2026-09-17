import { useSearchParams } from 'react-router-dom';
import { API_URL } from '../api';

const errorMessages = {
  oauth_not_configured: 'Google sign-in is not configured on the server yet.',
  invalid_oauth_state: 'The sign-in request expired. Please try again.',
  email_not_verified: 'Google returned an email that is not verified.',
  oauth_failed: 'Google sign-in could not be completed. Please try again.'
};

export default function Login() {
  const [searchParams] = useSearchParams();
  const error = errorMessages[searchParams.get('error')];

  return (
    <main className="login-page">
      <section className="login-art">
        <div className="login-brand"><span className="brand-mark">G</span><span className="brand-name">GYMONE</span></div>
        <div className="login-art-copy"><p className="eyebrow">The member operations studio</p><h1>Make every rep count.</h1><p>A calmer, sharper way to run your gym.</p></div>
        <div className="login-art-ring" />
      </section>
      <section className="login-panel">
        <div className="login-card">
          <p className="eyebrow">Welcome back</p>
          <h2>Sign in to GYMONE</h2>
          <p className="login-description">Use your Google account to access your gym workspace.</p>
          {error && <div className="login-error" role="alert">{error}</div>}
          <a className="google-button" href={`${API_URL}/auth/google`}><span className="google-icon">G</span><span>Continue with Google</span></a>
          <p className="login-footnote">Only verified Google email accounts can continue.</p>
        </div>
      </section>
    </main>
  );
}