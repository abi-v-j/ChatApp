import BaseController from "./BaseController.js";

export default class TypingController extends BaseController{
  

    TypingStarted = ({ Id }) => {
        let skt = this.socket.broadcast
        skt = Id ? skt.to(Id) : skt
        skt.emit("typing-started-from-server")
    }

    TypingEnded = ({ Id }) => {
        let skt = this.socket.broadcast
        skt = Id ? skt.to(Id) : skt
        skt.emit("typing-stopped-from-server")
    }
}


