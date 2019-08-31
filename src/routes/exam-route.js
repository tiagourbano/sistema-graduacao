'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/exam-controller');

router.get('/', controller.getNextExam);
router.put('/:id', controller.put);
router.post('/', controller.post);
router.delete('/', controller.delete);

module.exports = router;
