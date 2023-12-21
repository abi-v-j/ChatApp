import {TypingStarted, TypingEnded} from './Controllers/TypingControllers.js'

const Sockets = (socket) => {
    socket.on('send-message', ({message, Id}) => {
        let skt = socket.broadcast
        skt = Id ? skt.to(Id) : skt
        skt.emit("message-from-server", {message})
    })

    socket.on('typing-started', TypingStarted)

    socket.on('typing-stopped', TypingEnded)

    socket.on('join-room', ({roomId}) => {
        socket.join('join room')
    })

    socket.on('disconnect', (socket) => {
        console.log('User is left');
        // socket.on('send-message', (data) => {
        //     socket.emit("message-from-server", data)
        // })                         
    })
}

export default Sockets