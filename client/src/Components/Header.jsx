import { Box, Button, Card } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import SocketContext from '../MyContext'
import axios from 'axios'
import Cookie from 'js-cookie'



const Header = ({ setUserId }) => {
    const [rooms, setRooms] = useState([])
    const { socket, userId } = useContext(SocketContext)

    const navigate = useNavigate()

    const CreateNewRoom = () => {
        const Id = uuidv4()
        navigate(`/Room/${Id}`)
        socket.emit('new-room-created', { Id, userId })
        // setRooms((prevRoom) => [...prevRoom, {Id,name:'Test',_id:'testId'}])

    }
    const fetchData = () => {
        axios.get('http://localhost:7000/room').then((response) => {
            const data = response.data
            console.log(data);
            setRooms(data)

        })
    }

    const Login = () => {
        const userId = uuidv4()
        setUserId(userId)
        Cookie.set('userId', userId)
        navigate('/')
    }

    const Logout = () => {
        setUserId(null)
        Cookie.remove('userId')
        navigate('/')
    }


    useEffect(() => {
        fetchData()

    }, [])

    useEffect(() => {
        if (!socket) return

        socket.on('new-room-created', ({room}) => {
            setRooms((prevRoom) => [...prevRoom, room])
        })

        socket.on('remove-room', ({ Id }) => {
            setRooms(rooms.filter((room) => room.roomId !== Id))
        })
    }, [socket])


    return (
        <Card sx={{ marginTop: 5, backgroundColor: 'gray' }} raised>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Link to='../' >
                        <Button sx={{ color: 'white' }} variant='text'>Home</Button>
                    </Link>

                    {
                        rooms.map((room, key) => (
                            <Link to={`/Room/${room.roomId}`} key={key} >
                                <Button sx={{ color: 'white', textDecoration: 'none' }} variant='text'>{room.name}</Button>
                            </Link>
                        ))
                    }
                </Box>

                <Box>
                    {
                        userId && <>
                            <Button sx={{ color: 'white', textDecoration: 'none' }} variant='text' onClick={CreateNewRoom}>New Room</Button>
                            <Button sx={{ color: 'white', textDecoration: 'none' }} variant='text' onClick={Logout}>LogOut</Button>
                        </>
                    }
                    {
                        !userId && <Button sx={{ color: 'white', textDecoration: 'none' }} variant='text' onClick={Login}>Login</Button>

                    }

                </Box>
            </Box>
        </Card>
    )
}

export default Header