import { useState } from 'react';
import { API_URL } from '../api';

export default function Renewal() {
  const [form, setForm] = useState({ MemberID: '', NextRenewalDate: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/renewals`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert('Membership renewed!');
  };

  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">Retention & care</p><h2>Renew a membership</h2><p>Help members stay consistent by recording their next renewal date.</p></div></div>
      <section className="panel form-panel"><form onSubmit={handleSubmit} className="form-grid"><div className="field"><label htmlFor="renewal-member">Member ID</label><input id="renewal-member" placeholder="e.g. 1042" onChange={e => setForm({ ...form, MemberID: e.target.value })} /></div><div className="field"><label htmlFor="renewal-date">Next renewal date</label><input id="renewal-date" type="date" onChange={e => setForm({ ...form, NextRenewalDate: e.target.value })} /></div><div className="form-actions"><button className="action-button" type="submit">Renew membership</button></div></form></section>
      <section className="panel" style={{ marginTop: '20px' }}><div className="panel-heading"><h3>Renewal rhythm</h3><span>Keep members moving</span></div><p style={{ color: '#738077', lineHeight: 1.6, marginBottom: 0 }}>A timely renewal keeps the experience uninterrupted. Use the member ID and their agreed next date to update the record.</p></section>
    </>
  );
}
