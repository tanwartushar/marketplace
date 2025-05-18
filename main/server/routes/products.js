const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {

    res.send('Products route hit');
});

module.exports = router;
