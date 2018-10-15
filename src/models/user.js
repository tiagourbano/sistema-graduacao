'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['student', 'teacher', 'master', 'admin'],
        default: 'student'
    }],
    currentBelt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Belt'
    },
    historyBelt: [{
        examDate: {
            type: Date,
            required: true
        },
        applyedBelt: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Belt'
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'approved', 'disapproved'],
            default: 'pending'
        }
    }]
});

module.exports = mongoose.model('User', schema);