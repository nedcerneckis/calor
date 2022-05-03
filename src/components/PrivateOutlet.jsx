import { Box, Container, CssBaseline } from "@mui/material";
import { Auth } from "aws-amplify";
import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, Outlet } from "react-router-dom";

export function PrivateOutlet() {
  const { user } = useAuth();
  const [persistantUser, setPersistantUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [didFail, setDidFail] = useState(false);

  useEffect(() => {
    checkIfUserIsAuthenticated();
  }, []);

  const checkIfUserIsAuthenticated = async () => {
    const user = await Auth.currentAuthenticatedUser().catch(err => {
      setDidFail(true);
      console.log(err);
    });
    setPersistantUser(user);
    setLoading(false);
  }

  if (loading) {
    console.log('persistantUser', persistantUser);
    console.log('user', user);
    console.log('didFail', didFail);
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (didFail) {
    return <Navigate to="/signin" />
  }

  return user || persistantUser ? <Outlet /> : <Navigate to="/signin" />;
}