import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

const API = process.env.REACT_APP_API_BASE_URL;

function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const { login } = useContext(UserContext);
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API}/api/auth/login`, {
            identifier,
            password
            });

            login(res.data.token);

        localStorage.setItem('token', res.data.token);
        console.log("Login successful.")
        setMessage('Login successful!');
        
        } catch (err) {
            setMessage(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <input
            type="text"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
};

export default Login;