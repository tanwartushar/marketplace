import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token); 
                setUser({ id: decoded.userId, email: decoded.email, token });
            } catch (err) {
                console.error("Invalic token: ", err);
                localStorage.removeItem('token');   // clear if invalid
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);   // save token for 'persistence'
        const decoded = jwtDecode(token);
        setUser({ id: decoded.userId, email: decoded.email, token})
    };
    
    const logout = (token) => {
        localStorage.removeItem('token', token);
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}
