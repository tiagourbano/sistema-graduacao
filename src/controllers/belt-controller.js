'use strict';

const repository = require('../repositories/belt-repository');
const guid = require('guid');
// const authService = require('../services/auth-service');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    try {
        // const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // const data = await authService.decodeToken(token);

        await repository.create({
            name: req.body.name
        });
        res.status(201).send({
            message: 'Faixa cadastrada com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}