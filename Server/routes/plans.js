const express = require('express');
const router = express.Router();
const db = require('../db');

// Add new plan
router.post('/', async (req, res) => {
  const { PlanName, PlanAmount, SchemeID } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO "PlanMaster" ("PlanName", "PlanAmount", "SchemeID")
       VALUES ($1, $2, $3) RETURNING "PlanID"`,
      [PlanName, PlanAmount, SchemeID]
    );
    res.json({ id: result.rows[0].PlanID });
  } catch (error) {
    res.status(500).send(error);
  }
});

// List all plans
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM "PlanMaster"`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
