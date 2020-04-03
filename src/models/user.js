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
    dob: {
        type: Date,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
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
        currentBelt: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Belt'
        },
        appliedBelt: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Belt'
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'approved', 'failed'],
            default: 'pending'
        },
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam'
        },
        blows: [{
            type: Number,
            required: false,
        }],
        note: {
            type: String,
            required: false,
        }
    }],
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('User', schema);
