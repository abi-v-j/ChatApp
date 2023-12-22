import { Router } from "express";
const router = new Router();
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import "../env.js";
import User from "../Models/User.js";

router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.json({ message: "Invalid credentials",check:false });
    }

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      return res.json({ message: "Invalid credentials",check:false });
    }

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
        res.json({ token, message: "Login successful",check:true });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
