const express = require('express');
const router = express.Router();
const clubController = require('./../controllers/club.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/create', checkToken, clubController.create);
router.put('/update', checkToken, clubController.update);
router.delete('/distroy/:id', checkToken, clubController.distroy);
router.get('/', checkToken, clubController.index);
router.get('/:id', checkToken, clubController.get);

module.exports = router;