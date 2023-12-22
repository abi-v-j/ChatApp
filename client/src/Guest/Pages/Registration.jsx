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
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [confirmshowPassword, setConfirmShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassord] = useState("");
  const [repassword, setRePassord] = useState("");

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
        console.log(response.data);
      });
  };

  const addData = (event) => {
    event.preventDefault();

    if (!userName || !password) {
      console.error("userName or password is undefined");
      return;
    }

    const requestData = {
      name,
      userName,
      password,
    };

    axios.post("http://localhost:7000/user/", requestData).then((response) => {
      Cookies.set("userId", response.data.token);
      alert(response.data.message);
      navigate("/Admin");
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
          width: "30%",
          height: 500,
          backgroundColor: "ButtonShadow",
          display: "flex",
          justifyContent: "center",
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
          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            fullWidth
            sx={{ mt: 2 }}
            onChange={handleUsername}
            value={userName}
          />
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
        </Box>
      </Card>
    </Box>
  );
};

export default Registration;
