import express from 'express'
import http  from 'http'
import { Server } from 'socket.io'
const app = express()
const PORT = 7000

const httpServer = http.createServer(app)
const io = new Server(httpServer)



app.get('',(req,res) => {
   res.json({data:'hello world'})
})

io.on('connection', (socket) => {
    console.log('connection is ready');
})

httpServer.listen(PORT, () => {
   console.log('server is running ');
})