import { Router } from "express";
import Auth from "../auth/Auth.js";

const router = Router();


router.get('/', Auth, (req, res) => {
  res.json({ message: 'Protected route accessed successfully',check:true  });
});

export default router;
