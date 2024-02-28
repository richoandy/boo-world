'use strict';

const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment');
const { jwtMiddleware } = require('./route.middleware');
const comment = require('../repositories/comment');

module.exports = function () {
    router.patch('/like/:id', jwtMiddleware, commentController.like);
    router.post('/', jwtMiddleware, commentController.create);
    router.get('/profile/:id', commentController.getComments);
    return router;
}

