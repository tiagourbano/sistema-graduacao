'use strict';

const repository = require('../repositories/exam-repository');
const moment = require('moment');

exports.getNextExam = async(req, res, next) => {
  try {
    var data = await repository.getNextExam();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.getExams = async(req, res, next) => {
  try {
    var data = await repository.getExams();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.getExamById = async(req, res, next) => {
  try {
      var data = await repository.getExamById(req.params.id);
      res.status(200).send(data);
  } catch (e) {
      res.status(500).send({
          message: 'Falha ao processar sua requisição'
      });
  }
}

exports.post = async(req, res, next) => {
  try {
    await repository.create({
      startDate: moment(req.body.startDate).utc().startOf('day').toDate(),
      endDate: moment(req.body.endDate).utc().endOf('day').toDate()
    });
    res.status(201).send({
      message: 'Exame cadastrado com sucesso!'
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.put = async(req, res, next) => {
  try {
      await repository.update(req.params.id, {
        startDate: moment(req.body.startDate).utc().startOf('day').toDate(),
        endDate: moment(req.body.endDate).utc().endOf('day').toDate()
      });
      res.status(200).send({
          message: 'Exame atualizado com sucesso!'
      });
  } catch (e) {
      res.status(500).send({
          message: 'Falha ao processar sua requisição'
      });
  }
};

exports.delete = async(req, res, next) => {
  try {
      await repository.delete(req.body.id)
      res.status(200).send({
          message: 'Exame removido com sucesso!'
      });
  } catch (e) {
      res.status(500).send({
          message: 'Falha ao processar sua requisição'
      });
  }
};
