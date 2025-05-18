const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

// signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.'})
    }

    try {
        // user or email already exists check
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'Username or email already exists. '});
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert new user into database
        const newUserResult = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        const newUser = newUserResult.rows[0];

        // generate JWT
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, username: newUser.username, email: newUser.email }, token });

    } catch (error) {
        console.error('Error during signup: ', error);
        res.status(500).json({ message: 'Something went wrong during Signup.'})
    }

});

// login route
router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;  //idnetifier= username or email

    if (!identifier || !password) {
        return res.status(400).json({ message: 'Please provide username/email and password. '});
    }

    try {
        const userResult = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $1', [identifier]
        );

        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.'});
        }

        // compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // generate JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email } });


    } catch (error) {
        console.error('Error during login: ', error);
        res.status(500).json({ message: 'Something went wrong during Login.'})
    }
});

module.exports = router;
