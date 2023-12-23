import { Avatar, Box, Button, Card, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext, useState } from 'react'
// import { v4 as uuidv4 } from 'uuid';
import SocketContext from '../../MyContext'



const Search = () => {
    const [userdata, setUserData] = useState([])
    const { socket } = useContext(SocketContext)



    const handleSearch = (event) => {
        const userName = event.target.value;

        if (userName === '') {
            setUserData([])
        }
        else {
            axios
                .post("http://localhost:7000/userSearch/", { userName })
                .then((response) => {
                    const data = response.data.userData
                    console.log(data);
                    setUserData(data)

                });

        }
    }

    const handleAddRequest = (Id) => {

        socket.emit('send-request', { Id })

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
                                            <Button size='small' variant="outlined" onClick={() => handleAddRequest(data._id)}>Add</Button>
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