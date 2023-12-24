import React, { useContext, useLayoutEffect } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Card, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import SocketContext from '../../MyContext'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios';

const ChatWindow = () => {

    const { socket } = useContext(SocketContext);
    const { Id } = useParams()
    const navigate = useNavigate()




    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const [typing, setTyping] = useState(false)
    const [typingTimeOut, setTypingTimeOut] = useState(null)


    const handleSubmit = (e) => {
        e.preventDefault();
        const Uid = Cookies.get('userId')

        socket.emit('send-message', { message, Id, Uid })

        setMessage('')


    }

    const handleInput = (e) => {
        setMessage(e.target.value)
        socket.emit('typing-started', { Id })

        if (typingTimeOut) clearTimeout(typingTimeOut)

        setTypingTimeOut(setTimeout(() => {
            socket.emit('typing-stopped', { Id })
        }, 500))
    }

    const removeRoom = () => {
        socket.emit('remove-socket-room', { Id })
        navigate('/')
    }



    useLayoutEffect(() => {
        const Uid = Cookies.get('userId')

        axios.post('http://localhost:7000/showChat/', { Uid, Id })
            .then((response) => {
                const data = response.data.userDataWithReceived
                setChat(data)


            })
    }, [Id])



    useEffect(() => {
        if (!socket) return


        socket.on('message-from-server', () => {
            const Uid = Cookies.get('userId')

            axios.post('http://localhost:7000/showChat/', { Uid, Id })
                .then((response) => {
                    const data = response.data.userDataWithReceived
                    setChat(data)


                })

        })

        socket.on('typing-started-from-server', () => setTyping(true))
        socket.on('typing-stopped-from-server', () => setTyping(false))




    }, [socket])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ padding: 2, marginTop: 10, width: '60%', backgroundColor: 'gray', color: 'white' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {

                        Id && <Typography>Room : {Id}</Typography>
                    }
                    {
                        Id && <Button variant='text' size='small' color='inherit' onClick={removeRoom}>Delete</Button>

                    }
                </Box>
                <Box sx={{ marginBottom: 5 }}>
                    {
                        chat.map((msg, key) => (

                            <Typography sx={{ display: 'flex', justifyContent: msg.received ? 'flex-start' : 'flex-end' }} key={key}>
                                <Card sx={{ px: 2, mx: 3, mt: 1 }}>
                                    {msg.message}
                                </Card>
                            </Typography>
                        ))
                    }
                </Box>
                <Box component='form' onSubmit={handleSubmit}>
                    {
                        typing && <InputLabel sx={{ color: 'white' }} shrink htmlFor="message-input">
                            Typing...
                        </InputLabel>
                    }

                    <OutlinedInput
                        id='message-input'
                        sx={{ backgroundColor: 'white', width: '100%' }}
                        onChange={handleInput}
                        value={message}
                        size='small'
                        placeholder='Write your message'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    type='submit'
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Box>
            </Card>
        </Box>
    )
}

export default ChatWindow