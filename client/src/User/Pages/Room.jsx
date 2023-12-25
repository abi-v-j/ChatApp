import React, { useContext, useEffect } from 'react'
import SocketContext from '../../MyContext'
import ChatWindow from '../Components/ChatWindow'

const Room = ({Id, userName}) => {


  const {socket} = useContext(SocketContext)

  useEffect(() => {
    if (!socket) return


    socket.emit('join-room', { Id })
  }, [socket,Id])



  return (
   
 
        <ChatWindow Id={Id} userName={userName} />
  
  )
}

export default Room