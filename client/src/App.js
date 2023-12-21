import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import Room from './Pages/Room'
import ChatWindow from './Pages/ChatWindow'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import SocketContext from './MyContext'


const App = () => {

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io("http://localhost:7000"))

  }, [])



  return (
    <SocketContext.Provider value={socket}>
      <Container>
        <Header />
        <Routes u>
          <Route path='/' element={<Home />} />
          <Route path='/Chat' element={<ChatWindow />} />
          <Route path='/Room/:Id' element={<Room />} />
        </Routes>
      </Container>
    </SocketContext.Provider>

  )
}

export default App