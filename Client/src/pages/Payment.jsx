import { useState, useEffect } from 'react';
import { API_URL } from '../api';

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ MemberID: '', PlanID: '', PaymentAmount: '' });

  useEffect(() => {
    fetch(`${API_URL}/payments`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setPayments(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/payments`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert('Payment recorded!');
  };

  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">Finance & activity</p><h2>Record a payment</h2><p>Keep every contribution accounted for with a clear, simple transaction log.</p></div></div>
      <section className="panel form-panel"><form onSubmit={handleSubmit} className="form-grid"><div className="field"><label htmlFor="payment-member">Member ID</label><input id="payment-member" placeholder="e.g. 1042" onChange={e => setForm({ ...form, MemberID: e.target.value })} /></div><div className="field"><label htmlFor="payment-plan">Plan ID</label><input id="payment-plan" placeholder="e.g. 3" onChange={e => setForm({ ...form, PlanID: e.target.value })} /></div><div className="field"><label htmlFor="payment-amount">Amount</label><input id="payment-amount" type="number" min="0" step="0.01" placeholder="0.00" onChange={e => setForm({ ...form, PaymentAmount: e.target.value })} /></div><div className="form-actions"><button className="action-button" type="submit">Save payment</button></div></form></section>
      <section className="panel table-panel"><div className="panel-heading"><h3>Payment activity</h3><span>{payments.length} records</span></div><div className="table-wrap"><table className="data-table"><thead><tr><th>Payment ID</th><th>Member</th><th>Amount</th></tr></thead><tbody>{payments.length ? payments.map(p => <tr key={p.PaymentID}><td>{p.PaymentID}</td><td>Member {p.MemberID}</td><td>{p.PaymentAmount}</td></tr>) : <tr><td className="empty-state" colSpan="3">No payments have been recorded yet.</td></tr>}</tbody></table></div></section>
    </>
  );
}
