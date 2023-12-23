import React from 'react'
import { Route, Routes } from 'react-router-dom'
import User from './User/App'
import Guest from './Guest/App'


const App = () => {
 
  return (
    <Routes>
      <Route path='/User/*' element={<User />} />
      <Route path='*' element={<Guest />} />
    </Routes>
  )
}
export default App
