import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_BASE_URL;

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/api/auth/signup`, {
                username,
                email,
                password
            });

            localStorage.setItem('token', res.data.token);
            console.log("Signup successful.")
            setMessage('Signup successful!');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        <div>
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Signup</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
}

export default Signup;