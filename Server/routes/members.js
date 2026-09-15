const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { MemberNo, MemberFName, MemberLName, EmailID } = req.body;
  db.run(
    `INSERT INTO MemberRegistration (MemberNo, MemberFName, MemberLName, EmailID) VALUES (?, ?, ?, ?)`,
    [MemberNo, MemberFName, MemberLName, EmailID],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id: this.lastID });
    }
  );
});

router.get('/', (req, res) => {
  db.all(`SELECT * FROM MemberRegistration`, [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

module.exports = router;
