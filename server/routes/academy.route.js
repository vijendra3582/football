const express = require('express');
const router = express.Router();
const academyController = require('./../controllers/academy.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/insert', checkToken, academyController.insert);
router.put('/update', checkToken, academyController.update);
router.delete('/delete/:academy_id', checkToken, academyController.delete);
router.get('/all', checkToken, academyController.all);
router.get('/single/:academy_id', checkToken, academyController.single);

module.exports = router;