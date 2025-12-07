const { validationResult } = require('express-validator');
const Expert = require('../models/expert.model');
const ExpertMessages = require('../messages/expert.messages');

// -------------------------------------
// GET ALL
// -------------------------------------
exports.get = (req, res) => {
    Expert.find({}, (error, experts) => {
        if (error)
            return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);

        return res.status(ExpertMessages.success.s0.http).send({
            ...ExpertMessages.success.s0,
            body: experts
        });
    });
};

// -------------------------------------
// GET ONE
// -------------------------------------
exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0)
        return res.status(406).send(errors);

    Expert.findById(req.params.id, (error, expert) => {
        if (error || !expert)
            return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);

        return res.status(ExpertMessages.success.s0.http).send({
            ...ExpertMessages.success.s0,
            body: expert
        });
    });
};

// -------------------------------------
// CREATE
// -------------------------------------
exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0)
        return res.status(406).send(errors);

    console.log("📥 RECEBIDO NO CREATE:", req.body);

    const expert = new Expert({
        name: req.body.name,
        country: req.body.country,
        email: req.body.email,
        institution: req.body.institution,
        animal: req.body.animal,
        active: req.body.active
    });

    expert.save((error, result) => {
        if (error) {
            console.error("❌ ERRO AO GUARDAR EXPERT:", error);
            return res.status(ExpertMessages.error.e1.http).send(ExpertMessages.error.e1);
        }

        return res.status(ExpertMessages.success.s1.http).send({
            ...ExpertMessages.success.s1,
            body: result
        });
    });
};

// -------------------------------------
// UPDATE
// -------------------------------------
exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0)
        return res.status(406).send(errors);

    Expert.updateOne(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                country: req.body.country,
                email: req.body.email,
                institution: req.body.institution,
                animal: req.body.animal,
                active: req.body.active
            }
        },
        (error, result) => {
            if (error)
                return res.status(ExpertMessages.error.e2.http).send(ExpertMessages.error.e2);

            if (result.matchedCount <= 0)
                return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);

            return res.status(ExpertMessages.success.s2.http).send(ExpertMessages.success.s2);
        }
    );
};

// -------------------------------------
// DELETE
// -------------------------------------
exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0)
        return res.status(406).send(errors);

    Expert.deleteOne({ _id: req.params.id }, (error, result) => {
        if (error)
            return res.status(ExpertMessages.error.e3.http).send(ExpertMessages.error.e3);

        if (result.deletedCount <= 0)
            return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);

        return res.status(ExpertMessages.success.s3.http).send(ExpertMessages.success.s3);
    });
};

// -------------------------------------
// ACTIVATE
// -------------------------------------
exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0)
        return res.status(406).send(errors);

    Expert.updateOne(
        { _id: req.params.id },
        { $set: { active: true } },
        (error, result) => {
            if (error)
                return res.status(500).send({ message: "Erro interno ao ativar expert." });

            if (result.matchedCount <= 0)
                return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);

            return res.status(ExpertMessages.success.s5.http).send(ExpertMessages.success.s5);
        }
    );
};

// -------------------------------------
// DEACTIVATE
// -------------------------------------
exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0)
        return res.status(406).send(errors);

    Expert.updateOne(
        { _id: req.params.id },
        { $set: { active: false } },
        (error, result) => {
            if (error)
                return res.status(500).send({ message: "Erro interno ao desativar expert." });

            if (result.matchedCount <= 0)
                return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);

            return res.status(ExpertMessages.success.s4.http).send(ExpertMessages.success.s4);
        }
    );
};




