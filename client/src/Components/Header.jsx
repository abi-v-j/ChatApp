import { Button, Card } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';


const Header = () => {
    const Id = uuidv4()
    return (
        <Card sx={{marginTop:5,backgroundColor:'gray'}} raised>
            <Link to='../' >
                <Button sx={{color:'white'}} variant='text'>Home</Button>
            </Link>
            <Link to='/Chat' >
                <Button sx={{color:'white',textDecoration:'none'}} variant='text'>Chats</Button>
            </Link>
            <Link to={`/Room/${Id}`} >
                <Button sx={{color:'white',textDecoration:'none'}} variant='text'>Room</Button>
            </Link>
            
        </Card>
    )
}

export default Header