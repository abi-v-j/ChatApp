import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Room = () => {
    const params = useParams()

    useEffect(() => {
     console.log(params);
    }, [params])
    
  return (
    <div>Room</div>
  )
}

export default Room