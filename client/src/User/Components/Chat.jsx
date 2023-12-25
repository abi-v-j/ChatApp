import React, { useContext, useEffect, useState } from 'react'
import SocketContext from '../../MyContext'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Avatar, Box, Card, Typography } from '@mui/material'
import { Link } from 'react-router-dom'


const Chat = ({ setRoomId, setUserName }) => {
  const { socket } = useContext(SocketContext)

  // console.log(Id);

  const [chatName, setChatName] = useState([])


  useEffect(() => {
    const Id = Cookies.get('userId')
    axios.get(`http://localhost:7000/room/${Id}`).then((response) => {
      const data = response.data
      console.log(data);
      setChatName(data)
      console.log('hi');

    })
  }, [])

  useEffect(() => {
    if (!socket) return

    console.log('hello');


    const Id = Cookies.get('userId')



    socket.on('new-room-created', () => {
      axios.get(`http://localhost:7000/room/${Id}`).then((response) => {
        const data = response.data
        console.log(data);
        setChatName(data)
        console.log('how');

      })
    })



  }, [socket])




  useEffect(() => {
    if (!socket) return







  }, [socket])
  return (
    <Box sx={{ width: '60%', height: 400 }}>
      <Box sx={{ p: 5, overflowY: 'hidden', }}>
        {
          chatName.map((data, key) => (
            <Link onClick={() => { setRoomId(data.roomId); setUserName(data.name) }} style={{ textDecoration: 'none' }} key={key}>
              <Card sx={{ display: 'flex', mt: 2 }} key={key} >

                <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Avatar sx={{ width: 60, height: 60 }} />

                </Box>
                <Box sx={{ p: 3, width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant='h5'>
                      {data.name}
                    </Typography>

                  </Box>

                </Box>


              </Card>
            </Link>

          ))
        }


      </Box>

    </Box>
  )
}

export default Chat