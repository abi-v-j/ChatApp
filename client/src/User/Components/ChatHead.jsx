import { Avatar, Box, Card, Typography } from '@mui/material'
import React from 'react'

const ChatHead = ({ userData }) => {
    return (
        <Card sx={{ display: 'flex', p: 1 }} >

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar />

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Box>
                    <Typography variant='h6'>
                        {userData}
                    </Typography>

                </Box>

            </Box>


        </Card>
    )
}

export default ChatHead