import { Router } from 'express'
const router = new Router()
import Room from '../Models/Room.js'

router.get('/', async (req, res) => {
    let roomData = await Room.find()
    res.send(roomData).status(200)
})






export default  router