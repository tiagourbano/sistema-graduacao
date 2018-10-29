'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    description: {
        type: String,
        required: true
    },
    belt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Belt',
        required: true
    }
});

module.exports = mongoose.model('Blow', schema);