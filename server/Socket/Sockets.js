import TypingController from './Controllers/TypingControllers.js'
import RoomController from './Controllers/RoomController.js'

const Sockets = (socket) => {

    const typingController = new TypingController(socket)
    const roomController = new RoomController(socket)
    socket.on('send-message', ({message, Id}) => {
        let skt = socket.broadcast
        skt = Id ? skt.to(Id) : skt
        skt.emit("message-from-server", {message})
    })

    socket.on('typing-started', typingController.TypingStarted)

    socket.on('typing-stopped', typingController.TypingEnded)

    socket.on('join-room', roomController.JoinRoom )

    socket.on('disconnect', (socket) => {
        console.log('User is left');
        // socket.on('send-message', (data) => {
        //     socket.emit("message-from-server", data)
        // })                         
    })
}

export default Sockets