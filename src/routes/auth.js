const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashed]);
  res.send("User registered");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (!user.rows.length) return res.status(404).send("User not found");
  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.status(401).send("Invalid credentials");
  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
