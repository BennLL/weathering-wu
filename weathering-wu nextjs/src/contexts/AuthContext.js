"use client";

import { createContext, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext({
    token: null,
    setToken: () => { },
})

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof window !== "undefined") {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                }
            }
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (token !== null) {
            if (token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export function useAuth() {
    const { token, setToken } = useContext(AuthContext)
    return [token, setToken]
}