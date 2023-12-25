import { Avatar, Box, Button, Card, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import SocketContext from '../../MyContext'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



const Search = () => {
    const [userdata, setUserData] = useState([])
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()



    const handleSearch = (event) => {
        const userName = event.target.value;

        if (userName === '') {
            setUserData([])
        }
        else {

            const Id = Cookies.get('userId')

            axios
                .post("http://localhost:7000/userSearch/", { userName, Id })
                .then((response) => {
                    const data = response.data.userDataWithRooms
                    setUserData(data)

                });

        }
    }

    const handleAddRequest = (toId) => {

        const chatId = uuidv4()
        const fromId = Cookies.get('userId')
        navigate(`/User`)
        socket.emit('new-room-created', { chatId, toId, fromId })



    }



    return (
        <Box>
            <Box sx={{ m: 5 }}>
                <Card sx={{ p: 5 }}>
                    <TextField id="standard-basic" label="Standard" variant="standard" fullWidth onChange={handleSearch} />
                </Card>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                <Box sx={{ m: 5, width: '60%', height: 300 }}>
                    <Box sx={{ p: 5, overflowY: 'hidden', }}>
                        {
                            userdata.map((data, key) => (
                                <Box sx={{ display: 'flex' }} key={key}>

                                    <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Avatar sx={{ width: 60, height: 60 }} />

                                    </Box>
                                    <Box sx={{ p: 3, borderBottom: 1, width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography variant='h5'>
                                                {data.name}
                                            </Typography>
                                            <Typography >
                                                {data.userName}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <Button size='small' disabled={data.hasRoom} variant="outlined" onClick={() => handleAddRequest(data._id)}>{data.hasRoom ? 'Already Added' : 'Add'}</Button>
                                        </Box>
                                    </Box>


                                </Box>
                            ))
                        }


                    </Box>

                </Box>



            </Box>
        </Box>
    )
}

export default Search