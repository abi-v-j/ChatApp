import BaseController from "./BaseController.js"
import Chat from "../../Models/Chat.js"
import jwt from "jsonwebtoken";
import "../../env.js";
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


export default class MessageController extends BaseController {

    SendMessage = async ({ message, Id, Uid }) => {

        const decodedToken = jwt.verify(Uid, process.env.JWT_SECRET);
        const userId = decodedToken.user.id;

        const chat = new Chat({
            message,
            sessionId: Id,
            UserId: userId
        })
        await chat.save()



        let skt = this.socket.broadcast
        skt = Id ? skt.to(Id) : skt
        skt.emit("message-from-server")
        this.socket.emit('message-from-server')
    }

    Sendfile = ({ data, Id, Uid, fileName }) => {
        try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);

            const filePath = __dirname + '/upload/' + fileName;



            fs.writeFile(filePath, data, { encoding: 'base64' }, async () => {

                const decodedToken = jwt.verify(Uid, process.env.JWT_SECRET);
                const userId = decodedToken.user.id;


              
                    const chat = new Chat({
                        image: data.toString('base64'),
                        sessionId: Id,
                        UserId: userId
                    })
                    await chat.save()

              

                let skt = this.socket.broadcast
                skt = Id ? skt.to(Id) : skt
                skt.emit("uploaded")
                this.socket.emit('uploaded')

            });

        } catch (error) {
            console.error('Error during video upload:', error);
        }


    }

}