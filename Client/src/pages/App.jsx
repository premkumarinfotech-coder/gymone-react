import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Member from './Member';
import Payment from './Payment';
import Renewals from './Renewals';
import Reports from './Reports';
import Login from './Login';
import { API_URL } from '../api';

const navItems = [
  { path: '/', label: 'Overview', icon: '⌂' },
  { path: '/members', label: 'Members', icon: '◎' },
  { path: '/payments', label: 'Payments', icon: '$' },
  { path: '/renewals', label: 'Renewals', icon: '↻' },
  { path: '/reports', label: 'Reports', icon: '▥' },
];

function Dashboard() {
  return (
    <>
      <div className="hero">
        <section className="hero-panel">
          <p className="eyebrow">Tuesday, September 15, 2026</p>
          <h1>Make every rep count.</h1>
          <p>Keep your members moving and your gym running smoothly from one focused workspace.</p>
        </section>
        <section className="hero-stat">
          <p className="eyebrow">Today's focus</p>
          <div className="stat-value">GYM</div>
          <p>Strong systems build stronger communities.</p>
        </section>
      </div>
      <div className="stats-grid">
        <div className="stat-card"><span className="stat-label">Active members</span><strong>—</strong></div>
        <div className="stat-card"><span className="stat-label">This month's revenue</span><strong>—</strong></div>
        <div className="stat-card"><span className="stat-label">Renewals due</span><strong>—</strong></div>
      </div>
      <div className="section-grid">
        <section className="panel">
          <div className="panel-heading"><h3>Quick actions</h3><span>Stay in motion</span></div>
          <ul className="list-clean">
            <li><Link to="/members"><strong>Register a member</strong><span>→</span></Link></li>
            <li><Link to="/payments"><strong>Record a payment</strong><span>→</span></Link></li>
            <li><Link to="/renewals"><strong>Renew a membership</strong><span>→</span></Link></li>
          </ul>
        </section>
        <section className="panel">
          <div className="panel-heading"><h3>At a glance</h3><span>Live data</span></div>
          <ul className="list-clean">
            <li><span>Member records</span><strong>Ready</strong></li>
            <li><span>Payment tracking</span><strong>Ready</strong></li>
            <li><span>Reports</span><strong>Ready</strong></li>
          </ul>
        </section>
      </div>
    </>
  );
}

function AppLayout({ user, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const current = navItems.find(item => item.path === location.pathname);

  const handleLogout = async () => {
    await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
    onLogout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/" className="brand"><span className="brand-mark">G</span><span className="brand-name">GYMONE</span></Link>
        <p className="sidebar-label">Workspace</p>
        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} className="nav-link">
              <span className="nav-icon">{item.icon}</span>{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer"><strong>GYMONE Admin</strong>Operations workspace</div>
      </aside>
      <main className="main-area">
        <header className="topbar"><div className="breadcrumb">Workspace / <strong>{current?.label || 'Overview'}</strong></div><div className="user-chip"><span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span><span className="user-name">{user.name}</span><button className="logout-button" onClick={handleLogout}>Sign out</button></div></header>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Member />} />
            <Route path="/payments" element={<Payment />} />
            <Route path="/renewals" element={<Renewals />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function AuthGate() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: 'include' })
      .then(response => response.ok ? response.json() : null)
      .then(data => setUser(data?.user || null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (location.pathname === '/login') {
    return <Login />;
  }

  if (loading) {
    return <div className="auth-loading"><span className="brand-mark">G</span><p>Loading your workspace...</p></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout user={user} onLogout={() => setUser(null)} />;
}

export default function App() {
  return <Router><AuthGate /></Router>;
}
