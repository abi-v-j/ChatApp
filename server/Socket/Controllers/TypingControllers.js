export const TypingStarted = ({ Id }) => {
    let skt = socket.broadcast
    skt = Id ? skt.to(Id) : skt
    skt.emit("typing-started-from-server")
}

export const TypingEnded = ({ Id }) => {
    let skt = socket.broadcast
    skt = Id ? skt.to(Id) : skt
    skt.emit("typing-stopped-from-server")
}