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

exports.authenticate = async(data) => {
    const res = await User.findOne({
        // name: data.name,
        password: data.password
    });
    return res;
}

exports.getById = async(id) => {
    const res = await User.findById(id);
    return res;
}

exports.applyToExam = async(id, data) => {
    const user = await User.findById(id);
    const userExam = await User.findOne({
        _id: id,
        'historyBelt.examId': data.examId
    });

    if (userExam === null) {
        const historyBelt = user.historyBelt;

        historyBelt.push({
            examId: data.examId,
            appliedBelt: data.appliedBelt,
            status: 'pending'
        });

        await User
            .findByIdAndUpdate(id, {
                $set: {
                    historyBelt: historyBelt
                }
            });
    } else {
        return false;
    }
}
