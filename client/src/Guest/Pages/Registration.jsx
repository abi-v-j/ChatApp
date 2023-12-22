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

const Registration = () => {
  const [confirmshowPassword, setConfirmShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
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

  return (
    <Box
      sx={{
        width: "100%",
        height: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "30%",
          height: 400,
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
            label="Username"
            variant="standard"
            fullWidth
            sx={{ mt: 2 }}
          />
          <FormControl sx={{ mt: 2 }} variant="standard" fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              fullWidth
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
          <Button sx={{ mt: 3 }} fullWidth variant="contained">
            Next
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Registration;
