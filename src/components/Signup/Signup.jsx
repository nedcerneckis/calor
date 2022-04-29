import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
  Link as MuiLink
} from '@mui/material'
import logo from '../../logo.svg';
import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as routerLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../AuthContext';

const Signin = () => {

  const [toggle, setToggle] = useState(true);
  const [isInvalidSignup, setIsInvalidSignup] = useState(false);
  const [emailUsed, setEmailUsed] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const validSchemaLogin = yup.object({
    email: yup.string()
      .email('Please enter a valid email address.')
      .required('Please enter your email address.'),
    password: yup.string()
      .min(8, 'Must contain a minimum of 8 characters with atleast one uppercase letter and one number.')
      .required('Please enter your password.')
      .matches( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, 
        "Must contain a minimum of 8 characters with atleast one uppercase letter and one number."
      ),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords do not match!')
      .required('Please confirm your password.'),
    firstName: yup.string()
      .required('Please enter your first name.'),
    lastName: yup.string()
      .required('Please enter your last name.'),
  });

  const validConfirmationSchemaLogin = yup.object({
    confirmCode: yup.string()
      .required('Confirmation code required.')
  });

  const signUp = async () => {
    if (
      formik.values.email && 
      formik.values.password &&
      formik.values.confirmPassword && 
      formik.values.firstName &&
      formik.values.lastName &&
      formik.values.password === formik.values.confirmPassword &&
      formik.values.password.length >= 8 &&
      formik.values.password.match( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
      ) {
      setEmailUsed(formik.values.email);
      try {
        const user = await auth.signUp({
          username: formik.values.email,
          password: formik.values.password,
          attributes: {
            'custom:firstName': formik.values.firstName,
            'custom:lastName': formik.values.lastName
          }
        });
        console.log(user);
        setToggle(toggle => !toggle);
      } catch (error) {
        setIsInvalidSignup(true);
        console.log(error);
      }
    } else {
      console.log('No email or password entered');
    }
  }

  const verifySignUp = async () => {
    try {
      await auth.confirmSignUp(formik.values.email, confirmationFormik.values.confirmCode);
      navigate('/signin');
    } catch (error) {
      console.log('Error confirming sign up', error);
    }
  }

  const resendVerifyCode = async () => {
    try {
      await auth.resendSignUp(formik.values.email);
      console.log(`Code resent succesfully to ${formik.values.email}`);
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
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
            Please enter the confirmation code that was sent to <b>{emailUsed}</b>.
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
              onBlur={confirmationFormik.handleBlur}
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
                  Resend confirmation email.
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
          { isInvalidSignup 
          ?
          <Alert
            variant="outlined"
            severity="error"
            sx={{ m: 3}}
          >
            An account with the email <b>{emailUsed}</b> is already in use.
          </Alert>
          : 
          <Alert
            variant="outlined"
            severity="info"
            sx={{ m: 3}}
          >
            Your password must contain a minimum of 8 characters, at least one uppercase letter and one number.
          </Alert>
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
              id="firstName"
              label="First Name"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
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