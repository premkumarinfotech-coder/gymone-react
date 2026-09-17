const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const { MemberNo, MemberFName, MemberLName, EmailID } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO "MemberRegistration" ("MemberNo", "MemberFName", "MemberLName", "EmailID")
       VALUES ($1, $2, $3, $4) RETURNING "MemID"`,
      [MemberNo, MemberFName, MemberLName, EmailID]
    );
    res.json({ id: result.rows[0].MemID });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM "MemberRegistration"`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
