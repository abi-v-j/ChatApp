import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import sockets from './Socket/Sockets.js'
import MongoDB from './config/DB.js'
import roomRoute from './crud/Room.js'
import userRoute from './crud/User.js'
import checkRoute from './crud/CheckUser.js'
import userLogin from './crud/UserLogin.js'
import userAuth from './crud/Auth.js'
import userSearch from './crud/Search.js'

import cors from 'cors'

const app = express()
const PORT = 7000

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    }
})


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/room', roomRoute)
app.use('/user', userRoute)
app.use('/checkUser', checkRoute)
app.use('/userLogin', userLogin)
app.use('/userAuth', userAuth)
app.use('/userSearch', userSearch)



io.on('connection', sockets)




httpServer.listen(PORT, () => {
    MongoDB().then(() => {
        console.log('server is running ');
    })

})