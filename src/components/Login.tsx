import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import logo from '../assets/logo.png';
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setSnackBar } from "../store/features/snackbar/snackbar";
import { useDispatch } from "react-redux";
import {  loggedStatus } from "../store/features/user/user";

export default function Login() {
  const login: string = process.env.REACT_APP_LOGIN ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  
  interface FormValues {
    email: string;
    password: string;
  }

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: (values) => {},
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post(login, formik.values) as any;
      if (response?.data) {
        const { token ,user} = response.data;
        dispatch(
          loggedStatus({
            logged: true,
            token: token ?? '',
            name: user?.name ?? 'Unknown', 
            email: user?.email ?? 'Unknown'
          })
        );
      localStorage.setItem("authToken", JSON.stringify(token));
      navigate("/home");
      } else {
        console.error('No data received from server');
      }
      dispatch(
        setSnackBar({
          message: `Logged in successfully`,
          variant: "success",
        })
      );
    } catch (e:any) {
      if(e.response && e.response.status === 404)
      {
        dispatch(
          setSnackBar({
            message:"User not found",
            variant: "warning",
          })
        );
      }
      else if(e.response && e.response.status === 401)
      {
        dispatch(
          setSnackBar({
            message:"Invalid Credentiais",
            variant: "warning",
          })
        );
      }
      else{
        dispatch(
          setSnackBar({
            message:"Internal error",
            variant: "error",
          })
        );
      }
    }finally{
      setLoader(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ m: 1, bgcolor: "primary", height: 100, width: 100 ,objectFit:"fill"}}
          src={logo}
        ></Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0.5 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.email}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "black",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            value={formik.values.password}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "black",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              color: "white",
              backgroundColor: "black",
              height: 50,
              fontSize: 18,
            }}
          >
            {loader ? (
              <CircularProgress size={27} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
