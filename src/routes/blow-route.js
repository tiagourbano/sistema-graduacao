'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/blow-controller');

router.get('/', controller.getAll);
router.get('/:beltId', controller.getByBelt);
router.put('/:id', controller.put);
router.post('/', controller.post);
router.delete('/', controller.delete);

module.exports = router;