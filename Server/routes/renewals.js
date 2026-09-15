const express = require('express');
const router = express.Router();
const db = require('../db');

// Renew membership
router.post('/', (req, res) => {
  const { MemberID, NextRenewalDate } = req.body;
  db.run(
    `UPDATE PaymentDetails SET NextRenewalDate=? WHERE MemberID=?`,
    [NextRenewalDate, MemberID],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ renewed: this.changes });
    }
  );
});

// Search renewals
router.get('/search', (req, res) => {
  const { MemberID } = req.query;
  db.all(`SELECT * FROM PaymentDetails WHERE MemberID=?`, [MemberID], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

module.exports = router;
