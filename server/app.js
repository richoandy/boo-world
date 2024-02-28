'use strict';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const startApp = async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'boo_database' });
    console.log('Mongo Connected');

    // set the view engine to ejs
    app.set('view engine', 'ejs');

    // routes
    app.use(express.json());
    app.use('/profile', require('./routes/profile')());
    app.use('/user', require('./routes/user')());
    app.use('/comment', require('./routes/comment')());

    // start server
    const server = app.listen(port);
    console.log('Express started. Listening on %s', port);
};

startApp();

module.exports = {
    app, startApp
};