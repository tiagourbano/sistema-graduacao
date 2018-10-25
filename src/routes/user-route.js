'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
// const authService = require('../services/auth-service');

// router.get('/', authService.authorize, controller.get);
// router.post('/', authService.authorize, controller.post);

router.get('/', controller.getAll);
router.get('/:name', controller.getByName);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;