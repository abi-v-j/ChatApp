import React, { useContext, useEffect } from 'react'
import SocketContext from '../../MyContext'


const ViewRequest = () => {
    const { socket } = useContext(SocketContext)
   const Id = '658711ec46b10c12fc5dc2e7'

    

    
    useEffect(() => {
        if (!socket) return


        socket.emit('request-from-server', { Id })



    }, [socket,Id])
  return (
    <div>ViewRequest</div>
  )
}

export default ViewRequest