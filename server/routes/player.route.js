const express = require('express');
const router = express.Router();
const playerController = require('./../controllers/player.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/create', checkToken, playerController.create);
router.put('/update', checkToken, playerController.update);
router.delete('/distroy/:id', checkToken, playerController.distroy);
router.get('/', checkToken, playerController.index);
router.get('/:id', checkToken, playerController.get);

module.exports = router;