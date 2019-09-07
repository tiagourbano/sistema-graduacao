'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    description: [{ type: String }],
    belt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Belt',
        required: true
    },
    videos: [{ type: String }]
});

module.exports = mongoose.model('Blow', schema);
