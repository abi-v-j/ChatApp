import BaseController from "./BaseController.js"
import Room from "../../Models/Room.js";
import jwt from "jsonwebtoken";
import "../../env.js";

export default class RoomController extends BaseController {

    JoinRoom = ({ Id }) => {
        console.log('join room');
        this.socket.join(Id)
    }
    NewRoomCreated = ({ chatId, toId, fromId }) => {

        const decodedToken = jwt.verify(fromId, process.env.JWT_SECRET);
        const userId = decodedToken.user.id;



        const room = new Room({
            fromId : userId ,
            roomId: chatId,
            toId
        })
        room.save()

        this.socket.emit('new-room-created', { room })

    }
    RemoveRoom = async ({ Id }) => {
        await Room.deleteOne({ roomId: Id });
        this.socket.emit('remove-socket-room', { Id })


    }
}  