const express = require('express');
const router = express.Router();
const authController = require('./../controllers/auth.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('create', checkToken, )