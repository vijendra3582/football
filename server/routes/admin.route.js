const express = require('express');
const router = express.Router();
const adminController = require('./../controllers/admin.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/create', adminController.create);
router.put('/update', adminController.update);
router.delete('/distroy/:id', adminController.distroy);
router.get('/', adminController.index);
router.get('/:id', adminController.get);

module.exports = router;