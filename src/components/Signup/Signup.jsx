import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
  Link as MuiLink
} from '@mui/material'
import logo from '../../logo.svg';
import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as routerLink, Navigate, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { useEffect } from 'react';

const Signin = () => {

  const [toggle, setToggle] = useState(true);
  const [isInvalidSignup, setIsInvalidSignup] = useState(false);
  const [emailUsed, setEmailUsed] = useState('');

  const navigate = useNavigate();

  const validSchemaLogin = yup.object({
    email: yup.string()
      .email('Please enter a valid email address.')
      .required('Please enter your email address.'),
    password: yup.string()
      .min(8, 'Please enter a password with 8 or more characters.')
      .required('Please enter your password.'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), ''], 'Passwords do not match!')
      .required('Please confirm your password.'),
    confirmCovapde: yup.string()
      .required('Verification code required.')
  });

  const validConfirmationSchemaLogin = yup.object({
    confirmCode: yup.string()
      .required('Verification code required.')
  });


  const signUp = async () => {
    if (
      formik.values.email && 
      formik.values.password &&
      formik.values.confirmPassword
      ) {
      setEmailUsed(() => formik.values.email);
      try {
        const user = await Auth.signUp({
          username: formik.values.email,
          password: formik.values.password
        });
        console.log(user);
        setToggle(toggle => !toggle);
      } catch (error) {
        setIsInvalidSignup(() => true);
        console.log(error);
      }
    } else {
      console.log('No email or password entered');
    }
  }

  const verifySignUp = async () => {
    try {
      await Auth.confirmSignUp(formik.values.email, confirmationFormik.values.confirmCode);
      navigate('/signin');
    } catch (error) {
      console.log('Error confirming sign up', error);
    }
  }

  const resendVerifyCode = async () => {
    try {
      await Auth.resendSignUp(formik.values.email);
      console.log(`Code resent succesfully to ${formik.values.email}`);
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    },
    validationSchema: validSchemaLogin,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const confirmationFormik = useFormik({
    initialValues: {
      confirmCode: ''
    },
    validationSchema: validConfirmationSchemaLogin,
    onSubmit: (values) => {
      console.log(values);
    }
  })

  const renderConfirmationForm = () => {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} className="App-logo" alt="logo" />
            CALOR
          </Typography>
          <Alert
            variant="outlined"
            severity="info"
            sx={{ m: 3}}
          >
            Please enter the verification code that was sent to <b>{emailUsed}</b>.
          </Alert>
          <Box component="form" onSubmit={confirmationFormik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmCode"
              label="Confirmation Code"
              name="confirmCode"
              onChange={confirmationFormik.handleChange}
              value={confirmationFormik.values.confirmCode}
              error={confirmationFormik.touched.confirmCode && Boolean(confirmationFormik.errors.confirmCode)}
              helperText={confirmationFormik.touched.confirmCode && confirmationFormik.errors.confirmCode}
              autoFocus
            />
            <Button
              type="submit"
              color="success"
              onClick={verifySignUp}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
            <Grid container>
              <Grid item xs>
                <MuiLink onClick={resendVerifyCode}>
                  Resend Confirmation email.
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

    );
  }

  const renderForm = () => {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} className="App-logo" alt="logo" />
            CALOR
          </Typography>
          { isInvalidSignup ?
          <Alert
            variant="outlined"
            severity="error"
            sx={{ m: 3}}
          >
            An account with the email <b>{emailUsed}</b> is already in use.
          </Alert>
          : null
          }
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              type="password"
              id="confirmPassword"
            />
            <Button
              type="submit"
              onClick={signUp}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  component={routerLink}
                  to="/signin"
                  variant="body2">
                  {"Already have an account?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
   );
  }

  return (
   <div>
      {toggle ? renderForm() : renderConfirmationForm()} 
   </div>
  );
}

export default Signin;