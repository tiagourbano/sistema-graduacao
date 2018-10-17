'use strict';
const mongoose = require('mongoose');
const Belt = mongoose.model('Belt');

exports.getAll = async() => {
    var res = await Belt
        .find({}, 'name');
    return res;
}

exports.create = async(data) => {
    var belt = new Belt(data);
    await belt.save();
}