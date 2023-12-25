import React, { useContext, useRef } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Box, Card, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import SocketContext from '../../MyContext'
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios';
import ChatHead from './ChatHead';

const ChatWindow = ({ Id, userName }) => {


    const { socket } = useContext(SocketContext);
    // const navigate = useNavigate()
    const messagesContainerRef = useRef();





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

    // const removeRoom = () => {
    //     socket.emit('remove-socket-room', { Id })
    //     navigate('/')
    // }

    useEffect(() => {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;


    }, [chat])




    useEffect(() => {
        if (!socket) return;

        const fetchData = () => {
            const Uid = Cookies.get('userId');

            axios.post('http://localhost:7000/showChat/', { Uid, Id })
                .then((response) => {
                    const data = response.data.userDataWithReceived;
                    setChat(data);
                });
        };

        fetchData();

        const handleMessageFromServer = () => fetchData();

        socket.on('message-from-server', handleMessageFromServer);

        socket.on('typing-started-from-server', () => setTyping(true));
        socket.on('typing-stopped-from-server', () => setTyping(false));

        return () => {
            socket.off('message-from-server', handleMessageFromServer);
            // Remove other event listeners if needed
        };

    }, [socket, Id]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <Card sx={{ padding: 2, mt: 2, width: 600, backgroundColor: 'gray', color: 'white' }}>
                <Box sx={{ pb: 1 }}>
                    <ChatHead userData={userName} />
                </Box>
                <Box
                    sx={{
                        marginBottom: 5,
                        height: 300,
                        overflowY: 'scroll',
                        WebkitOverflowScrolling: 'touch',
                        '&::-webkit-scrollbar': {
                            width: '5px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'lightgray',
                        },
                    }}
                    ref={messagesContainerRef}
                >
                    {
                        chat.map((msg, key) => (

                            <Box sx={{ display: 'flex', justifyContent: msg.received ? 'flex-end' : 'flex-start' }} key={key}>
                                <Card sx={{ p: 1, mx: 3, mt: 1, borderRadius: 4, maxWidth: 180 }}>
                                    <Typography sx={{ fontWeight: 400 }}>
                                        {msg.message}
                                    </Typography>
                                </Card>
                            </Box>
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