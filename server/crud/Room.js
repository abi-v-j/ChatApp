import { Router } from 'express';
import Room from '../Models/Room.js';
import User from '../Models/User.js';
import jwt from 'jsonwebtoken';
import '../env.js';
import mongoose from 'mongoose';

const router = new Router();

router.get('/:Id', async (req, res) => {
    try {
        const Id = req.params.Id;

        const decodedToken = jwt.verify(Id, process.env.JWT_SECRET);
        const userId = decodedToken.user.id;

        const ObjUser = new mongoose.Types.ObjectId(userId)

        const filteredRooms = await Room.aggregate([
            {
                $match: {
                    $or: [
                        { toId: ObjUser },
                        { fromId: ObjUser },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'toId',
                    foreignField: '_id',
                    as: 'toUser',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'fromId',
                    foreignField: '_id',
                    as: 'fromUser',
                },
            },
            {
                $addFields: {
                    'toUser.roomId': '$roomId',
                },
            },
            {
                $addFields: {
                    'fromUser.roomId': '$roomId',
                },
            },
            {
                $project: {
                    toUser: {
                        $mergeObjects: [
                            { $arrayElemAt: ['$toUser', 0] },
                            {
                                check: {
                                    $eq: ['$toId', ObjUser],
                                },
                            },
                        ],
                    },
                    fromUser: {
                        $mergeObjects: [
                            { $arrayElemAt: ['$fromUser', 0] },
                            {
                                check: {
                                    $eq: ['$fromId', ObjUser],
                                },
                            },
                        ],
                    },
                },
            },
            {
                $project: {

                    userData: {
                        $cond: {
                            if: { $eq: ['$toUser.check', false] },
                            then: '$toUser',
                            else: '$fromUser',
                        },

                    },
                },
            },
            {
                $unwind: '$userData', // Unwind the array created by $cond
            },
            {
                $replaceRoot: { newRoot: '$userData' }, // Replace the root with userData
            },
            {
                $match: {
                    'check': false,
                },
            },
        ]);


        console.log(filteredRooms);
        res.status(200).send(filteredRooms);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

export default router;
