import React, { useState } from 'react';
import { Avatar, Button, TextField, Link, Box, Typography, Container } from '@mui/material';
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

export default function Login({setLogin}:{setLogin:React.Dispatch<React.SetStateAction<boolean>>} ): React.JSX.Element {

  const navigate = useNavigate()
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  interface FormValues {
    email: string;
    password: string;
  };

  const initialValues: FormValues = {
    email: "",
    password: ""
  };

  const validate = (values: FormValues) => {

    const errors: Partial<FormValues> = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@rguktrkv\.ac\.in$/;
    const passwordLength = 8;

    if (!emailPattern.test(values.email)) {
      console.log("email error")
      setEmailValid(true)
      setError("*Invalid Email Address")
      errors.email = ""
    }
    else {
      errors.email = "true";
      console.log("no email error")
      setEmailValid(false)
      setError("")
    }
    if (errors.email !== "") {
      if (passwordLength <= values.password.length) {
        setPasswordValid(false)
        setError("")
      }
      else {
        setPasswordValid(true)
        setError("*Password must be atleast 8 characters")
      }
    }
    return errors;
  }

  const formik = useFormik<FormValues>({
    initialValues,
    validate,
    onSubmit: (values) => { }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // send an api request
      //  const response= await fetch("",{
      //    method : 'post',
      //    headers : {
      //      "Content-Type" : "application/json",
      //    },
      //  });
      if(formik.values.email === "admin@rguktrkv.ac.in" && formik.values.password === "Admin@123"){
        setLogin(true);
        navigate("/PucUpload")
      }
      else{setError("*Wrong Credentials")}
    }
    catch (e) {
      setError("error");
    }
  };


  const inputs: React.JSX.Element = (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        type="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={formik.handleChange}
        value={formik.values.email}
        color={emailValid ? "error" : "primary"}
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
        color={passwordValid ? "error" : "primary"}
      />
    </>
  )

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary', height: 50, width: 50 }}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0.5 }}>
          {inputs}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}

          >
            {loader ? (
              <CircularProgress size={27} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
          <Box >
            <Box >
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Box>
            {error && (
              <Typography color="error" style={{ marginTop: 16, textAlign: 'left' }}>
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

