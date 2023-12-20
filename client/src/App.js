import React, { useEffect, useState } from 'react'
import { Box, Button, Container, FormControl, Input, InputLabel, TextField, Typography } from '@mui/material';
import { io } from 'socket.io-client'


const App = () => {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])


  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('send-message', { message })
    setMessage('')


  }

  useEffect(() => {
    setSocket(io("http://localhost:7000"))

  }, [])

  useEffect(() => {
    if (!socket) return


    socket.on('message-from-server', (data) => {
      setChat((prevChat) => [...prevChat, data.message]);

    })




  }, [socket])



  return (
    <div>
      <Container>
        <Box sx={{marginBottom:5}}>
        {
          chat.map((msg, key) => (

            <Typography key={key}>{msg}</Typography>
          ))
        }
        </Box>
      <Box component='form' onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
          />
        </FormControl>
        <Button variant="contained" type='submit'>Send</Button>
      </Box>
      </Container>
    </div>
  )
}

export default App