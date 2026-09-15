import { useState, useEffect } from 'react';

export default function Plan() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({ PlanName: '', PlanAmount: '', SchemeID: '' });

  useEffect(() => {
    fetch('http://localhost:5000/plans')
      .then(res => res.json())
      .then(data => setPlans(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert('Plan added!');
  };

  return (
    <div>
      <h2>Plans</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Plan Name" onChange={e => setForm({ ...form, PlanName: e.target.value })} />
        <input placeholder="Amount" onChange={e => setForm({ ...form, PlanAmount: e.target.value })} />
        <input placeholder="Scheme ID" onChange={e => setForm({ ...form, SchemeID: e.target.value })} />
        <button type="submit">Save</button>
      </form>

      <h3>Plan List</h3>
      <ul>
        {plans.map(p => (
          <li key={p.PlanID}>{p.PlanName} - {p.PlanAmount}</li>
        ))}
      </ul>
    </div>
  );
}
