'use strict';

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

module.exports = function () {
    router.post('/sign-up', userController.signUp);
    router.post('/sign-in', userController.signIn);

    return router;
}

