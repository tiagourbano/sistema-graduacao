'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/user-repository');
const authService = require('../services/auth-service');

exports.getAll = async(req, res, next) => {
    try {
        var data = await repository.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByName = async(req, res, next) => {
    try {
        var data = await repository.getByName(req.params.name);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O Nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 3, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A Senha deve conter pelo menos 6 caracteres');
    contract.isRequired(req.body.currentBelt, 'Faixa atual é obrigatório');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Usuário cadastrado com sucesso!',
            data: {
                name: req.body.name,
                email: req.body.email,
                currentBelt: req.body.currentBelt
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Usuário atualizado com sucesso!'
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
            message: 'Usuário removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.authenticate = async(req, res, next) => {
    try {
        const user = await repository.authenticate({
            name: req.body.name,
            password: req.body.facebookId
        });

        if (!user) {
            res.status(200).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        });

        res.status(201).send({
            token: token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                currentBelt: user.currentBelt
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const user = await repository.getById(data.id);

        if (!user) {
            res.status(404).send({
                message: 'Usuário não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.applyToExam = async(req, res, next) => {
    try {
        const response = await repository.applyToExam(req.params.id, req.body);
        if (!response) {
            res.status(200).send({
                message: 'Usuário já está aplicado a este exame!'
            });
            return;
        }

        res.status(200).send({
            message: 'Usuário aplicado ao exame com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
