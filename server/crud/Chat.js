import { Router } from "express";
import Chat from "../Models/Chat.js";
import jwt from 'jsonwebtoken';
import '../env.js';
import mongoose from "mongoose";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { Id, Uid } = req.body

        const decodedToken = jwt.verify(Uid, process.env.JWT_SECRET);
        const userId = decodedToken.user.id;
        const ObjUser = new mongoose.Types.ObjectId(userId)
        const userData = await Chat.find({ sessionId: Id });

        const userDataWithReceived = userData.map(item => ({
            ...item.toObject(),
            received: ObjUser.equals(item.UserId)
        }));


        return res.status(200).json({ userDataWithReceived });

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
