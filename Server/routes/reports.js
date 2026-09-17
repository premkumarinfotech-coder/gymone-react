const express = require('express');
const router = express.Router();
const db = require('../db');

// Monthly collection report
router.get('/monthly', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT TO_CHAR(TO_DATE("PaymentFromDate", 'YYYY-MM-DD'), 'MM-YYYY') AS "Month",
              SUM("PaymentAmount") AS "Total"
       FROM "PaymentDetails"
       GROUP BY "Month"`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Yearly collection report
router.get('/yearly', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT TO_CHAR(TO_DATE("PaymentFromDate", 'YYYY-MM-DD'), 'YYYY') AS "Year",
              SUM("PaymentAmount") AS "Total"
       FROM "PaymentDetails"
       GROUP BY "Year"`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Detailed member report
router.get('/details/:id', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT m.*, p.* FROM "MemberRegistration" m
       LEFT JOIN "PaymentDetails" p ON m."MemID" = p."MemberID"
       WHERE m."MemID" = $1`,
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
