import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import User from './User/App'
import Guest from './Guest/App'
import Cookies from 'js-cookie'
import axios from 'axios'

const App = () => {
  const navigate = useNavigate()
  const token = Cookies.get('userId')
  useEffect(() => {

    axios.get('http://localhost:7000/userAuth/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    })
      .then(response => {
        console.log(response.data);
        if(response.data.check){
          navigate('/User')
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])
  return (
    <Routes>
      <Route path='/User/*' element={<User />} />
      <Route path='*' element={<Guest />} />
    </Routes>
  )
}
export default App
