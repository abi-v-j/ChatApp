import { Avatar, Box, Card, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const Search = () => {
    const [userdata, setUserData] = useState([])
    const [check, setCheck] = useState(false)
    const handleSearch = (event) => {
        const userName = event.target.value;
        if(!userName) {
            setCheck(false)
            setUserData([])
        }


        axios
            .post("http://localhost:7000/userSearch/", { userName })
            .then((response) => {
                const data = response.data.userData
                console.log(data);
                setUserData(data)
                setCheck(true)

            });

    }
    return (
        <Box>
            <Box sx={{ m: 5 }}>
                <Card sx={{ p: 5 }}>
                    <TextField id="standard-basic" label="Standard" variant="standard" fullWidth onChange={handleSearch} />
                </Card>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {
                    check &&
                    <Box sx={{ m: 5, width: 500 }}>
                        <Card sx={{ p: 5 }}>
                            {
                                userdata.map((data, key) => (
                                    <Box sx={{ display: 'flex' }} key={key}>

                                        <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Avatar />

                                        </Box>
                                        <Box sx={{ p: 3, borderBottom: 1, width: '80%' }}>
                                            <Typography variant='h5'>
                                                {data.name}
                                            </Typography>
                                        </Box>


                                    </Box>
                                ))
                            }


                        </Card>

                    </Box>
                }


            </Box>
        </Box>
    )
}

export default Search