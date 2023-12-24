import React, { useContext, useEffect, useState } from 'react'
import SocketContext from '../../MyContext'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Avatar, Box, Card, Typography } from '@mui/material'
import { Link } from 'react-router-dom'


const Chat = () => {
  const { socket } = useContext(SocketContext)

  // console.log(Id);

  const [chatName, setChatName] = useState([])

  useEffect(() => {
    const Id = Cookies.get('userId')

    axios.get(`http://localhost:7000/room/${Id}`).then((response) => {
      const data = response.data
      console.log(data);
      setChatName(data)


    })
  }, [])




  useEffect(() => {
    if (!socket) return




    // socket.emit('request-from-server', { Id })



  }, [socket])
  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Box sx={{ p: 5, overflowY: 'hidden', }}>
        {
          chatName.map((data, key) => (
            <Link to={`/User/Room/${data.roomId}`} style={{ textDecoration: 'none' }} key={key}>
              <Card sx={{ display: 'flex', mt: 2 }} key={key}>

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