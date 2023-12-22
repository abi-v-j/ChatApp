import { Router } from "express";
const router = new Router();
import User from "../Models/User.js";

router.post("/", async (req, res) => {
  const { userName } = req.body;
  const userData = await User.findOne({ userName });
  res.send(userData).status(200);
});
export default router;
