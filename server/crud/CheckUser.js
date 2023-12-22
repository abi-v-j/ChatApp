import { Router } from "express";
import User from "../Models/User.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { userName } = req.body;

    const userData = await User.findOne({ userName });

    if (userData) {
      return res.status(200).json({ check: true });
    } else {
      return res.status(200).json({ check: false });
    }
  } catch (error) {

    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
