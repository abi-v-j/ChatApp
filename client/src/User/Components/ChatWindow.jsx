import React, { useContext, useRef } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Card, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import SocketContext from '../../MyContext'
import Cookies from 'js-cookie'
import axios from 'axios';
import ChatHead from './ChatHead';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import styled from '@emotion/styled';

const ChatWindow = ({ Id, userName }) => {


    const { socket } = useContext(SocketContext);
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
                    console.log(data);
                });
        };

        fetchData();

        const handleMessageFromServer = () => fetchData();

        socket.on('message-from-server', handleMessageFromServer);

        socket.on('uploaded', handleMessageFromServer);



        socket.on('typing-started-from-server', () => setTyping(true));
        socket.on('typing-stopped-from-server', () => setTyping(false));

        return () => {
            socket.off('message-from-server', handleMessageFromServer);
        };

    }, [socket, Id]);

    const handleFile = (e) => {
        const file = e.target.files[0]

        const Uid = Cookies.get('userId')


        if (!file) return

        

        const randomString = Math.random().toString(36).substring(2, 15);
        const timestamp = new Date().getTime();
        const fileName = `${randomString}_${timestamp}_${file.name}`; const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const data = reader.result
            socket.emit('upload', { data, Id, Uid, fileName })
        }
    }


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

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
                                <Card sx={{ px: 2, mx: 3, mt: 1, borderRadius: 4, maxWidth: 200 }}>
                                    {
                                        msg.image && <img src={msg.image} alt='Image' width={200} />

                                    }
                                    {
                                        msg.message &&
                                        <Typography sx={{ fontWeight: 400 }} id="bootstrap-input">
                                            {msg.message}
                                        </Typography>
                                    }
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                        <InputLabel sx={{ display: 'flex', justifyContent: 'flex-end' }} shrink htmlFor="bootstrap-input">
                                            {new Date(msg.dateTime).toLocaleTimeString()}
                                        </InputLabel>
                                    </Box>
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
                                <Button
                                    edge="end"
                                    component="label"
                                    sx={{ marginRight: 1 }}
                                >
                                    <VisuallyHiddenInput onChange={handleFile} type="file" />
                                    <AttachFileIcon />


                                </Button>
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