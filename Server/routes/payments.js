const express = require('express');
const router = express.Router();
const db = require('../db');

// Create payment
router.post('/', async (req, res) => {
  const { MemberID, PlanID, PaymentAmount, PaymentFromDate, PaymentToDate } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO "PaymentDetails" ("MemberID", "PlanID", "PaymentAmount", "PaymentFromDate", "PaymentToDate")
       VALUES ($1, $2, $3, $4, $5) RETURNING "PaymentID"`,
      [MemberID, PlanID, PaymentAmount, PaymentFromDate, PaymentToDate]
    );
    res.json({ id: result.rows[0].PaymentID });
  } catch (error) {
    res.status(500).send(error);
  }
});

// List payments
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM "PaymentDetails"`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
