import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SocketContext from '../../MyContext'
import ChatWindow from '../Components/ChatWindow'

const Room = () => {
  const {Id} = useParams()

  const {socket} = useContext(SocketContext)

  useEffect(() => {
    if (!socket) return


    socket.emit('join-room', { Id })
  }, [socket,Id])

  return (
      <ChatWindow/>
  )
}

export default Room