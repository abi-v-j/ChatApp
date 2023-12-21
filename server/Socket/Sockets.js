import TypingController from './Controllers/TypingControllers.js'
import RoomController from './Controllers/RoomController.js'
import MessageController from './Controllers/MessageController.js'

const Sockets = (socket) => {

    const typingController = new TypingController(socket)
    const roomController = new RoomController(socket)
    const messageController = new MessageController(socket)
    
    socket.on('send-message', messageController.SendMessage )

    socket.on('typing-started', typingController.TypingStarted)

    socket.on('typing-stopped', typingController.TypingEnded)

    socket.on('join-room', roomController.JoinRoom )
    socket.on('new-room-created', roomController.NewRoomCreated )
    socket.on('remove-room', roomController.RemoveRoom )

    socket.on('disconnect', (socket) => {
        console.log('User is left');
                              
    })
}

export default Sockets