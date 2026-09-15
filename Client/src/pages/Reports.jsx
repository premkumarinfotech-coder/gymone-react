import { useState, useEffect } from 'react';

export default function Reports() {
  const [monthly, setMonthly] = useState([]);
  const [yearly, setYearly] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/reports/monthly', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setMonthly(data));

    fetch('http://localhost:5000/reports/yearly', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setYearly(data));
  }, []);

  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">Performance & insight</p><h2>Reports</h2><p>See how the gym is performing over time, from monthly collection to annual momentum.</p></div></div>
      <div className="section-grid"><section className="panel"><div className="panel-heading"><h3>Monthly collection</h3><span>{monthly.length} months</span></div><ul className="list-clean">{monthly.length ? monthly.map(r => <li key={r.Month}><span>{r.Month}</span><strong>{r.Total}</strong></li>) : <li className="empty-state">No monthly data available yet.</li>}</ul></section><section className="panel"><div className="panel-heading"><h3>Yearly collection</h3><span>{yearly.length} years</span></div><ul className="list-clean">{yearly.length ? yearly.map(r => <li key={r.Year}><span>{r.Year}</span><strong>{r.Total}</strong></li>) : <li className="empty-state">No yearly data available yet.</li>}</ul></section></div>
    </>
  );
}
