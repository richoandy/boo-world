'use strict';

const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile');

// const profiles = [
//   {
//     "id": 1,
//     "name": "A Martinez",
//     "description": "Adolph Larrue Martinez III.",
//     "mbti": "ISFJ",
//     "enneagram": "9w3",
//     "variant": "sp/so",
//     "tritype": 725,
//     "socionics": "SEE",
//     "sloan": "RCOEN",
//     "psyche": "FEVL",
//     "image": "https://soulverse.boo.world/images/1.png",
//   }
// ];

module.exports = function () {
  router.post('/', profileController.create);

  router.get('/:id', profileController.getOne);

  return router;
}

