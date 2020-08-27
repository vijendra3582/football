const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');
const { checkToken } = require('../middlewares/auth.middleware');

router.post('/create', checkToken, teamController.create);
router.put('/update', checkToken, teamController.update);
router.delete('/distroy/:id', checkToken, teamController.distroy);
router.get('/', checkToken, teamController.index);
router.get('/:id', checkToken, teamController.get);

module.exports = router;