import { Box } from '@mui/material'
import React, { useState } from 'react'
import Room from './Room'
import Chat from '../Components/Chat'

const Home = () => {
    const [Id, setRoomId ] = useState('')
    const [userName, setUserName ] = useState('')

    return (
        <Box sx={{
            display: 'flex',
            '@media (max-width: 1200px)': {
                flexDirection: 'column', // Change the flex direction to column when the screen is less than 600px
            },
        }}>
             <Chat setRoomId={setRoomId} setUserName={setUserName} />
             {
                Id && <Room Id={Id} userName={userName} />
             }
        </Box>
    )
}

export default Home