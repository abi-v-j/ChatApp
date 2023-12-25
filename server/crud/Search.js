import { Router } from "express";
import User from "../Models/User.js";
import Room from '../Models/Room.js';

import jwt from 'jsonwebtoken';
import '../env.js';
import mongoose from "mongoose";


const router = Router();

router.post("/", async (req, res) => {
  try {
    const { userName, Id } = req.body;

    const decodedToken = jwt.verify(Id, process.env.JWT_SECRET);
    const userId = decodedToken.user.id;
    const ObjUser = new mongoose.Types.ObjectId(userId)

    // Using a regular expression for a case-insensitive search
    const userData = await User.find({
      $and: [
        { _id: { $ne: ObjUser } }, // Exclude the currently authenticated user
        { userName: { $regex: userName, $options: 'i' } }
      ]
    });
    if (userData && userData.length > 0) {
      // Check if there is a room with matching fromId or toId for the current user
      const rooms = await Room.find({
        $or: [
          { fromId: ObjUser, toId: { $in: userData.map(user => user._id) } },
          { toId: ObjUser, fromId: { $in: userData.map(user => user._id) } },
        ],
      });

      // Add a field indicating whether a room exists or not
      // Use map to create a new array with the modified objects
      const userDataWithRooms = userData.map(user => ({
        ...user.toObject(),
        hasRoom: rooms.some(room =>
          (room.fromId.equals(ObjUser) && room.toId.equals(user._id)) ||
          (room.toId.equals(ObjUser) && room.fromId.equals(user._id))
        ),
      }));

      console.log(userDataWithRooms);
      return res.status(200).json({ userDataWithRooms });
    } else {
      return res.status(200).json({ userDataWithRooms: [] });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
