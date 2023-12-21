import BaseController from "./BaseController.js"

export default class RoomController extends BaseController {
   
    JoinRoom = ({Id}) => {
        this.socket.join(Id)
    }
}