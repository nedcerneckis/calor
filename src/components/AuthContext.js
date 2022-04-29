import React, { createContext, useContext, useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState();

    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            console.log('Hub listening...');
            console.log(event)
            switch (event) {
                case 'signIn':
                    setUser(data);
                    console.log(data);
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

    const value = {
        user,
        signUp,
        confirmSignUp,
        signIn,
        signOut,
        resendSignUp
    }

    function signUp(email, password, firstName, lastName) {
        return Auth.signUp({
            username: email,
            password: password,
            attributes: {
                'custom:firstName': firstName,
                'custom:lastName': lastName
            }
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
