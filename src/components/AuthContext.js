import React, { createContext, useContext, useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState();

    useEffect(() => {
        checkIfUserIsAuthenticated();

        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                    setUser(data);
                    break;
                case 'signOut':
                    setUser(null);
                    break;
                default:
                    break;
            }
        });
        
        return () => {
            Hub.remove('auth', () => console.log('Hub not listening...'));
        }   
    }, []);

    const checkIfUserIsAuthenticated = async () => {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
    }

    const value = {
        user,
        signUp,
        confirmSignUp,
        signIn,
        signOut,
        resendSignUp
    }

    function signUp({username, password, attributes}) {
        return Auth.signUp({
            username: username,
            password: password,
            attributes: attributes
        });

    }

    function confirmSignUp(email, code) {
        return Auth.confirmSignUp(email, code);
    }

    function resendSignUp(email) {
        return Auth.resendSignUp(email);
    }

    function signIn(email, password) {
        return Auth.signIn(email, password);
    }

    function signOut() {
        return Auth.signOut();
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
