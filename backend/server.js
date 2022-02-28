const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');

require('dotenv').config();

const app = express();
const port = process.env.API_PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false 
}));

const uri = process.env.ATLAS_URI;

mongoose.connect(uri);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

const packsRouter = require('./routes/packs');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth')

app.use('/packs', packsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);