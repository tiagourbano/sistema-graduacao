'use strict';
const mongoose = require('mongoose');
const Blow = mongoose.model('Blow');
const Belt = mongoose.model('Belt');

exports.getAll = async() => {
    var res = await Blow
        .find({})
        .populate('belt', 'name');
    return res;
}

exports.getByBelt = async(beltId) => {
    var res = await Blow
        .findOne({
            belt: beltId
        })
        .populate('belt', 'name');

    if (res === null) {
        var belt = await Belt.findById(beltId);
        res = {
            belt,
        }
    }

    return res;
}

exports.create = async(data) => {
    var blow = new Blow(data);
    await blow.save();
}

exports.update = async(id, data) => {
    await Blow
        .findByIdAndUpdate(id, {
            $set: data
        });
}

exports.delete = async(id) => {
    await Blow
        .findByIdAndRemove(id);
}
