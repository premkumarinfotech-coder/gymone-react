const express = require('express');
const router = express.Router();
const db = require('../db');

// Renew membership
router.post('/', async (req, res) => {
  const { MemberID, NextRenewalDate } = req.body;
  try {
    const result = await db.query(
      `UPDATE "PaymentDetails" SET "NextRenewalDate" = $1 WHERE "MemberID" = $2`,
      [NextRenewalDate, MemberID]
    );
    res.json({ renewed: result.rowCount });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Search renewals
router.get('/search', async (req, res) => {
  const { MemberID } = req.query;
  try {
    const result = await db.query(
      `SELECT * FROM "PaymentDetails" WHERE "MemberID" = $1`,
      [MemberID]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
