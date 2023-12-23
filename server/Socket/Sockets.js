import TypingController from './Controllers/TypingControllers.js'
import RoomController from './Controllers/RoomController.js'
import MessageController from './Controllers/MessageController.js'
import RequestController from './Controllers/RequestController.js'

const Sockets = (socket) => {

    const typingController = new TypingController(socket)
    const roomController = new RoomController(socket)
    const messageController = new MessageController(socket)
    const requestController = new RequestController(socket)
    
    socket.on('send-message', messageController.SendMessage )
    
    socket.on('send-request', requestController.SendRequest )

    socket.on('typing-started', typingController.TypingStarted)

    socket.on('typing-stopped', typingController.TypingEnded)

    socket.on('join-room', roomController.JoinRoom )
    socket.on('new-room-created', roomController.NewRoomCreated )
    socket.on('remove-socket-room', roomController.RemoveRoom )

    socket.on('disconnect', (socket) => {
        console.log('User is left');
                              
    })
}

export default Sockets