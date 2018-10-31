'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getAll = async() => {
    var res = await User
        .find({})
        .populate('currentBelt', 'name')
        .populate('historyBelt.appliedBelt', 'name');
    return res;
}

exports.getByName = async(name) => {
    var res = await User
        .find({
            name: name,
            active: true
        })
        .populate('currentBelt', 'name')
        .populate('historyBelt.appliedBelt', 'name');
    return res;
}

exports.create = async(data) => {
    var user = new User(data);
    await user.save();
}

exports.update = async(id, data) => {
    await User
        .findByIdAndUpdate(id, {
            $set: data
        });
}

exports.delete = async(id) => {
    await User
        .findByIdAndRemove(id);
}