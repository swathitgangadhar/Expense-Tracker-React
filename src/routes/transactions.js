const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  const data = await pool.query("SELECT * FROM transactions WHERE user_id = $1", [req.user.id]);
  res.json(data.rows);
});

router.post("/add", async (req, res) => {
  const { type, amount, category } = req.body;
  await pool.query(
    "INSERT INTO transactions (user_id, type, amount, category) VALUES ($1, $2, $3, $4)",
    [req.user.id, type, amount, category]
  );
  res.send("Transaction added");
});

module.exports = router;