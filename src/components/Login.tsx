import React, { useState } from 'react';
import { Avatar, Button, TextField, Link, Box, Typography, Container } from '@mui/material';

import { useFormik } from "formik";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import { setDefaultResultOrder } from 'dns';
export default function  Login(): React.JSX.Element {
  
  const [loader,setLoader] = useState(false);
  const [error,setError] =  useState("");

  interface FormValues{
    email:string;
    password:string;
  };

  const initialValues:FormValues={
    email:"",
    password:""
  };

  const validate = (values:FormValues)=> {

    const errors: Partial<FormValues> = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@rguktrkv\.ac\.in$/;
    if (!emailPattern.test(values.email)) {
      errors.email = "Invalid email";
    } 
    else {
      errors.email = "";
    }
    return errors; 
  }

  const formik = useFormik <FormValues>({
    initialValues,
    validate,
    onSubmit:(values)=>{}
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    try{
    // send an api request
    //  const response= await fetch("",{
    //    method : 'post',
    //    headers : {
    //      "Content-Type" : "application/json",
    //    },
    //  });
    }
    catch(e){
      setError("error");
    }
  };

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
        <Avatar sx={{ m: 1, bgcolor: 'primary',height:50,width:50 }}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0.5 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          
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
          <Typography color="error" style={{ marginTop: 16, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

