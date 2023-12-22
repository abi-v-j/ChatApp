import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import Room from './Pages/Room'
import ChatWindow from './Components/ChatWindow'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import SocketContext from '../MyContext'
import Cookies from 'js-cookie'


const App = () => {

  const [socket, setSocket] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    setSocket(io("http://localhost:7000"))
    const _userId = Cookies.get('userId')
    if(_userId) setUserId(_userId)

  }, [])



  return (
    <SocketContext.Provider value={{socket,userId}}>
      <Container>
        <Header setUserId={setUserId} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Chat' element={<ChatWindow />} />
          <Route path='/Room/:Id' element={<Room />} />
        </Routes>
      </Container>
    </SocketContext.Provider>

  )
}

export default App