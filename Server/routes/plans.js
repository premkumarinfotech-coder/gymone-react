const express = require('express');
const router = express.Router();
const db = require('../db');

// Add new plan
router.post('/', (req, res) => {
  const { PlanName, PlanAmount, SchemeID } = req.body;
  db.run(
    `INSERT INTO PlanMaster (PlanName, PlanAmount, SchemeID) VALUES (?, ?, ?)`,
    [PlanName, PlanAmount, SchemeID],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id: this.lastID });
    }
  );
});

// List all plans
router.get('/', (req, res) => {
  db.all(`SELECT * FROM PlanMaster`, [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

module.exports = router;
