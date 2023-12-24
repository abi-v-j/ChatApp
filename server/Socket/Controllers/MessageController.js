import BaseController from "./BaseController.js"
import Chat from "../../Models/Chat.js"
import jwt from "jsonwebtoken";
import "../../env.js";

export default class MessageController extends BaseController {

    SendMessage = async ({ message, Id, Uid }) => {

        const decodedToken = jwt.verify(Uid, process.env.JWT_SECRET);
        const userId = decodedToken.user.id;

        const chat = new Chat({
            message,
            sessionId: Id,
            UserId: userId
        })
        await chat.save()



        let skt = this.socket.broadcast
        skt = Id ? skt.to(Id) : skt
        skt.emit("message-from-server")
        this.socket.emit('message-from-server')
    }

}