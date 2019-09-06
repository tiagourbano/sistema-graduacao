'use strict';
const mongoose = require('mongoose');
const moment = require('moment');
const Exam = mongoose.model('Exam');

exports.getNextExam = async() => {
  var today = moment().utc().startOf('day');

  var res = await Exam
    .find({
      endDate: {
        $gte: today.toDate()
      }
    });
  return res;
}

exports.getExams = async() => {
  var currentYear = moment().year();

  var res = await Exam
    .find({
      endDate: {
        $gte: moment().day(0).month(0).year(currentYear).toDate()
      }
    })
    .sort({endDate: 'desc'});
  return res;
}

exports.getExamById = async(id) => {
  return await Exam.findById(id);
}

exports.create = async(data) => {
  var exam = new Exam(data);
  await exam.save();
}

exports.update = async(id, data) => {
  await Exam
    .findByIdAndUpdate(id, {
      $set: data
    });
}

exports.delete = async(id) => {
  await Exam
    .findByIdAndRemove(id);
}
