import { Router } from "express";
import User from "../Models/User.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { userName } = req.body;

    // Using a regular expression for a case-insensitive search
    const userData = await User.find({ userName: { $regex: userName, $options: 'i' } });

    if (userData && userData.length > 0) {
      return res.status(200).json({  userData });
    } else {
      return res.status(200).json({ userData: [] });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
