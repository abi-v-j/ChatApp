import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [confirmshowPassword, setConfirmShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassord] = useState("");
  const [repassword, setRePassord] = useState("");
  const [check, setCheck] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const confirmHandleClickShowPassword = () =>
    setConfirmShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const confirmHandleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUsername = (event) => {
    setUserName(event.target.value);
    const userName = event.target.value;
    axios
      .post("http://localhost:7000/checkUser/", { userName })
      .then((response) => {
        const data = response.data.check
        setCheck(data)
      });
  };

  const addData = (event) => {
    event.preventDefault();

    if (!userName || !password) {
      console.error("userName or password is undefined");
      return;
    }

    if (check) {
      alert("Username taken.Please choose another")
      return
    }

    const requestData = {
      name,
      userName,
      password,
    };

    axios.post("http://localhost:7000/user/", requestData).then((response) => {
      Cookies.set("userId", response.data.token);
      alert(response.data.message);
      if (response.data.check) {
        navigate("/User");
      }
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      component="form"
      onSubmit={addData}
    >
      <Card
        sx={{
          width: 400,
          height: 500,
          backgroundColor: "ButtonShadow",
          display: "flex",
          justifyContent: "center",
          p: 2
        }}
      >
        <Box sx={{ width: "60%", p: 4 }}>
          <Box>
            <Typography textAlign="center" variant="h4">
              AJ
            </Typography>
            <Typography textAlign="center">Sign up to AJ</Typography>
          </Box>
          <TextField
            id="standard-basic"
            label="Full Name"
            variant="standard"
            fullWidth
            sx={{ mt: 2 }}
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <Box sx={{ mt: 2 }}>


            <TextField
              id="my-show-text"
              label="Username"
              variant="standard"
              fullWidth

              onChange={handleUsername}
              value={userName}
            />
            <Box sx={{ height: 5 }}>

              {
                check && <InputLabel shrink htmlFor="my-show-text">
                  <Typography color='error'>
                    Username taken
                  </Typography>
                </InputLabel>
              }
            </Box>


          </Box>
          <FormControl sx={{ mt: 2 }} variant="standard" fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              fullWidth
              onChange={(event) => setPassord(event.target.value)}
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl sx={{ mt: 2 }} variant="standard" fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              Re-Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              fullWidth
              onChange={(event) => setRePassord(event.target.value)}
              value={repassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={confirmHandleClickShowPassword}
                    onMouseDown={confirmHandleMouseDownPassword}
                  >
                    {confirmshowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button sx={{ mt: 3 }} fullWidth variant="contained" type="submit">
            Next
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Link to='/'>
              <Button variant="text" >I have an Account</Button>
            </Link>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Registration;
