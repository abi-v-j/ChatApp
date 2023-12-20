import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import Room from './Pages/Room'
import ChatWindow from './Pages/ChatWindow'


const App = () => {



  return (
    
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Chat' element={<ChatWindow />} />
        <Route path='/Room/:Id' element={<Room />} />
      </Routes>
    </Container>

  )
}

export default App