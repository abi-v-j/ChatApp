import BaseController from "./BaseController.js"

export default class RequestController  extends BaseController {
   
    SendRequest = ({  Id }) => {
        let skt = this.socket.broadcast
        this.socket.join(Id)

        skt = Id ? skt.to(Id) : skt
        console.log(Id);
        skt.emit("request-from-server",{Id})
        
    }

}