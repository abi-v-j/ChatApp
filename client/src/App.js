import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from './User/App'
import Guest from './Guest/App'

const App = () => {
  return (
    <Routes>
      <Route path='/Admin/*' element={<Admin/>} />
      <Route path='*' element={<Guest/>} />
    </Routes>
  )
}
export default App
