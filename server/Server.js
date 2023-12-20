import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
const app = express()
const PORT = 7000

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    }
})

// import path from 'path'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)




// app.get('',(req,res) => {
//  //  res.json({data:'hello world'})
//  res.sendFile(path.join(__dirname, 'index.html'));

// })

io.on('connection', (socket) => {
    // console.log('connection is ready');
    socket.on('send-message', (data) => {
        socket.broadcast.emit("message-from-server", data)
    })
    socket.on('disconnect', (socket) => {
        console.log('User is left');
        // socket.on('send-message', (data) => {
        //     socket.emit("message-from-server", data)
        // })                         
    })
})




httpServer.listen(PORT, () => {
    console.log('server is running ');
})