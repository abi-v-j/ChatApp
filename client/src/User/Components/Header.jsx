import { Box, Button, Card } from '@mui/material'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SocketContext from '../../MyContext'
import Cookie from 'js-cookie'



const Header = ({ setUserId }) => {
    const { userId } = useContext(SocketContext)

    const navigate = useNavigate()


    const Login = () => {
        setUserId(userId)
        navigate('/')
    }


    const Logout = () => {
        setUserId(null)
        Cookie.remove('userId')
        navigate('/')
    }





    return (
        <Card sx={{ marginTop: 5, backgroundColor: 'gray', p: 1 }} raised>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{display:'flex'}}>

                    <Box>
                        <Link to='../' >
                            <Button sx={{ color: 'white' }} variant='text'>Home</Button>
                        </Link>
                    </Box>
                    <Box>
                        <Link to='./Search' >
                            <Button sx={{ color: 'white' }} variant='text'>Search</Button>
                        </Link>
                    </Box>

                </Box>

                <Box>
                    {
                        userId && <>
                            <Button sx={{ color: 'white', textDecoration: 'none' }} variant='text' onClick={Logout}>LogOut</Button>
                        </>
                    }
                    {
                        !userId && <Button sx={{ color: 'white', textDecoration: 'none' }} variant='text' onClick={Login}>Login</Button>

                    }

                </Box>
            </Box>
        </Card>
    )
}

export default Header