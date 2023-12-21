import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import sockets from './Socket/Sockets.js'
import MongoDB from './config/DB.js'
import roomRoute from './crud/Room.js'
import cors from 'cors'

const app = express()
const PORT = 7000

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    }
})

MongoDB()
// import path from 'path'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)


app.use(cors())
app.use('/room', roomRoute)


// app.get('',(req,res) => {
//  //  res.json({data:'hello world'})
//  res.sendFile(path.join(__dirname, 'index.html'));

// })

io.on('connection', sockets)




httpServer.listen(PORT, () => {
    console.log('server is running ');
})