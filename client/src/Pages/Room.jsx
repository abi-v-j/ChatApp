import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SocketContext from '../MyContext'
import ChatWindow from './ChatWindow'
import { Typography } from '@mui/material'
const Room = () => {
  const params = useParams()

  const socket = useContext(SocketContext)

  useEffect(() => {
    if (!socket) return

    socket.emit('join-room', { roomId: params.Id })
  }, [socket])

  return (
      <ChatWindow/>
  )
}

export default Room