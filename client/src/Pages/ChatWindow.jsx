import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Box, Card, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const ChatWindow = () => {


    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const [typing, setTyping] = useState(false)
    const [typingTimeOut, setTypingTimeOut] = useState(null)


    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('send-message', { message })
        setChat((prevChat) => [...prevChat, { message, received: false }]);

        setMessage('')


    }

    const handleInput = (e) => {
        setMessage(e.target.value)
        socket.emit('typing-started')

        if (typingTimeOut) clearTimeout(typingTimeOut)

        setTypingTimeOut(setTimeout(() => {
            socket.emit('typing-stopped')
        }, 500))
    }

    useEffect(() => {
        setSocket(io("http://localhost:7000"))

    }, [])

    useEffect(() => {
        if (!socket) return


        socket.on('message-from-server', (data) => {
            setChat((prevChat) => [...prevChat, { message: data.message, received: true }]);

        })

        socket.on('typing-started-from-server', () => setTyping(true))
        socket.on('typing-stopped-from-server', () => setTyping(false))




    }, [socket])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ padding: 2, marginTop: 10, width: '60%', backgroundColor: 'gray', color: 'white' }}>
                <Box sx={{ marginBottom: 5 }}>
                    {
                        chat.map((msg, key) => (

                            <Typography sx={{ textAlign: msg.received ? 'left' : 'right' }} key={key}>{msg.message}</Typography>
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