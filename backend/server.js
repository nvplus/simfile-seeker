const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

const packsRouter = require('./routes/packs');
const usersRouter = require('./routes/users');

app.use('/packs', packsRouter);
app.use('/users', usersRouter);