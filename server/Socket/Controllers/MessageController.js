import BaseController from "./BaseController.js"

export default class MessageController  extends BaseController {
   
    SendMessage = ({ message, Id }) => {
        let skt = this.socket.broadcast
        skt = Id ? skt.to(Id) : skt
        skt.emit("message-from-server", { message })
    }

}