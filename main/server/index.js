const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT;


// middleware
// const corsOptions = {
//     origin: 'http://localhost:3001',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// };

app.use(cors());
app.use(express.json());    // parse JSON requests

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


// test db connection 
pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL:', err));


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    console.log('GET / route hit');
    res.send('Online Marketplace API is running!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
