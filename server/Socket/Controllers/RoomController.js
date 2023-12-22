import BaseController from "./BaseController.js"
import Room from "../../Models/Room.js";

export default class RoomController extends BaseController {

    JoinRoom = ({ Id }) => {
        console.log('join room');
        this.socket.join(Id)
    }
    NewRoomCreated = ({ Id, userId }) => {
        const room = new Room({
            name: 'test',
            roomId: Id,
            userId
        })
        room.save()

        this.socket.emit('new-room-created', { room })

    }
    RemoveRoom = async ({ Id }) => {
        await Room.deleteOne({ roomId: Id });
        this.socket.emit('remove-socket-room', { Id })


    }
}  