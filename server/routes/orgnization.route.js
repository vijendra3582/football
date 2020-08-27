const express = require('express');
const router = express.Router();
const orgnizationController = require('./../controllers/orgnization.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/create', checkToken, orgnizationController.create);
router.put('/update', checkToken, orgnizationController.update);
router.delete('/distroy/:id', checkToken, orgnizationController.distroy);
router.get('/', checkToken, orgnizationController.index);
router.get('/:id', checkToken, orgnizationController.get);

module.exports = router;