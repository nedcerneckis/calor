import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material'
import logo from '../../logo.svg';
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as routerLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Signin = () => {

  const [isDetailsInvalid, setIsDetailsInvalid] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const signIn = async () => {
    try {
      await auth.signIn(formik.values.email, formik.values.password);
      navigate('/');
    } catch (error) {
      setIsDetailsInvalid(true);
      console.log(error);
    }
  }

  const validSchemaLogin = yup.object({
    email: yup.string()
      .email('Please enter a valid email address.')
      .required('Please enter your email address.'),
    password: yup.string()
      .min(8, 'Please enter a password with 8 or more characters.')
      .required('Please enter your password.')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validSchemaLogin,
    onSubmit: (values) => {
      setIsDetailsInvalid(() => false);
    }
  });

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
        {isDetailsInvalid ?
          <Alert
            variant="outlined"
            severity="error"
            sx={{ m: 3 }}
          >
            Couldn't find an account associated with this username or password.
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
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            onClick={signIn}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign-In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={routerLink}
                to="/signup"
                variant="body2">
                {"Sign up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Signin;