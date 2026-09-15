const express = require('express');
const router = express.Router();
const db = require('../db');

// Monthly collection report
router.get('/monthly', (req, res) => {
  db.all(
    `SELECT strftime('%m-%Y', PaymentFromDate) AS Month, SUM(PaymentAmount) AS Total
     FROM PaymentDetails GROUP BY Month`,
    [],
    (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows);
    }
  );
});

// Yearly collection report
router.get('/yearly', (req, res) => {
  db.all(
    `SELECT strftime('%Y', PaymentFromDate) AS Year, SUM(PaymentAmount) AS Total
     FROM PaymentDetails GROUP BY Year`,
    [],
    (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows);
    }
  );
});

// Detailed member report
router.get('/details/:id', (req, res) => {
  db.get(
    `SELECT m.*, p.* FROM MemberRegistration m
     LEFT JOIN PaymentDetails p ON m.MemID = p.MemberID
     WHERE m.MemID=?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).send(err);
      res.json(row);
    }
  );
});

module.exports = router;
