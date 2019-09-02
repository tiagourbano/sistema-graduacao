'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
// const authService = require('../services/auth-service');

// router.get('/', authService.authorize, controller.get);
// router.post('/', authService.authorize, controller.post);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.put('/:id', controller.put);
router.patch('/:id/apply-to-exam', controller.applyToExam);
router.delete('/', controller.delete);

module.exports = router;
