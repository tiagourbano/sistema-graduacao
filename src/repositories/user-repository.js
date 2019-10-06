'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getAll = async() => {
    var res = await User
        .find({})
        .populate('currentBelt', 'name')
        .populate('historyBelt.appliedBelt', 'name')
        .populate('historyBelt.currentBelt', 'name');
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
    const res = await User.findById(id)
        .populate('currentBelt', 'name')
        .populate('historyBelt.appliedBelt', 'name')
        .populate('historyBelt.currentBelt', 'name');
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
            currentBelt: data.currentBelt,
            status: 'pending'
        });

        const res = await User
            .findByIdAndUpdate(id, {
                $set: {
                    historyBelt: historyBelt
                }
            });
        return res;
    } else {
        return false;
    }
}

exports.getByExamId = async(id) => {
    const res = await User.find({})
    .populate('currentBelt', 'name')
    .populate({
        path: 'historyBelt.examId',
        match: {
            _id: id
        }
    })
    .populate('historyBelt.appliedBelt', 'name')
    .populate('historyBelt.currentBelt', 'name');
    return res;
}
