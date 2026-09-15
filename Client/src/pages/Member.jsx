import { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

export default function RegisterMember() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ MemberNo: '', MemberFName: '', MemberLName: '', EmailID: '' });

  useEffect(() => {
    fetch('http://localhost:5000/members', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setMembers(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/members', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert('Member registered!');
  };

  return (
    <>
      <div className="page-heading"><div><p className="eyebrow">People & profiles</p><h2>Register a member</h2><p>Add someone new to the GYMONE community and keep their details easy to find.</p></div></div>
      <section className="panel form-panel">
        <Form onSubmit={handleSubmit} className="form-grid">
          <div className="field"><label htmlFor="member-no">Member number</label><Form.Control id="member-no" placeholder="e.g. GYM-1042" onChange={e => setForm({ ...form, MemberNo: e.target.value })} /></div>
          <div className="field"><label htmlFor="email">Email address</label><Form.Control id="email" type="email" placeholder="name@example.com" onChange={e => setForm({ ...form, EmailID: e.target.value })} /></div>
          <div className="field"><label htmlFor="first-name">First name</label><Form.Control id="first-name" placeholder="First name" onChange={e => setForm({ ...form, MemberFName: e.target.value })} /></div>
          <div className="field"><label htmlFor="last-name">Last name</label><Form.Control id="last-name" placeholder="Last name" onChange={e => setForm({ ...form, MemberLName: e.target.value })} /></div>
          <div className="form-actions"><Button type="submit" className="action-button">Save member</Button></div>
        </Form>
      </section>
      <section className="panel table-panel"><div className="panel-heading"><h3>Member directory</h3><span>{members.length} records</span></div><div className="table-wrap"><Table className="data-table"><thead><tr><th>ID</th><th>Name</th><th>Email</th></tr></thead><tbody>{members.length ? members.map(m => <tr key={m.MemID}><td>{m.MemID}</td><td>{m.MemberFName} {m.MemberLName}</td><td>{m.EmailID}</td></tr>) : <tr><td className="empty-state" colSpan="3">No members have been added yet.</td></tr>}</tbody></Table></div></section>
    </>
  );
}