const express = require('express');
const router = express.Router();
const db = require('../db');

// Create payment
router.post('/', (req, res) => {
  const { MemberID, PlanID, PaymentAmount, PaymentFromDate, PaymentToDate } = req.body;
  db.run(
    `INSERT INTO PaymentDetails (MemberID, PlanID, PaymentAmount, PaymentFromDate, PaymentToDate) VALUES (?, ?, ?, ?, ?)`,
    [MemberID, PlanID, PaymentAmount, PaymentFromDate, PaymentToDate],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id: this.lastID });
    }
  );
});

// List payments
router.get('/', (req, res) => {
  db.all(`SELECT * FROM PaymentDetails`, [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

module.exports = router;
