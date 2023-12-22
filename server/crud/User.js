import { Router } from "express";
const router = new Router();
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "../env.js";
import User from "../Models/User.js";

router.post("/", async (req, res) => {
  const { userName, password, name } = req.body;
  try {

    const user = new User({
      userName,
      password,
      name
    });

    const salt = 12;
    user.password = await argon2.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: "User registration successful" });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
