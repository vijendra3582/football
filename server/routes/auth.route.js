const express = require("express");
const router = express.Router();
const authController = require('./../controllers/auth.controller');

router.post('/:type/login', authController.login);
// router.post('/:type/register', authController.register);
// router.get('/:type/me', checkToken, authController.me);

module.exports = router;