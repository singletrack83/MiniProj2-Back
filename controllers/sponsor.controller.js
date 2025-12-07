// controllers/sponsor.controller.js
const { validationResult } = require("express-validator");
const Sponsor = require("../models/sponsor.model");
const SponsorMessages = require("../messages/sponsor.messages");

exports.get = (req, res) => {
  Sponsor.find({}, (error, sponsors) => {
    if (error) {
      return res
        .status(SponsorMessages.error.e0.http)
        .send(SponsorMessages.error.e0);
    }

    return res.status(SponsorMessages.success.s0.http).send({
      ...SponsorMessages.success.s0,
      body: sponsors
    });
  });
};

exports.getOne = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Sponsor.findById(req.params.id, (error, sponsor) => {
    if (error || !sponsor)
      return res
        .status(SponsorMessages.error.e0.http)
        .send(SponsorMessages.error.e0);

    return res.status(SponsorMessages.success.s0.http).send({
      ...SponsorMessages.success.s0,
      body: sponsor
    });
  });
};

exports.create = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  let sponsor = new Sponsor({
    name: req.body.name,
    type: req.body.type,
    animal: req.body.animal,
    email: req.body.email,
    website: req.body.website,
    active: true
  });

  sponsor.save((error, result) => {
    if (error) {
      return res
        .status(SponsorMessages.error.e1.http)
        .send(SponsorMessages.error.e1);
    }

    return res.status(SponsorMessages.success.s1.http).send({
      ...SponsorMessages.success.s1,
      body: result
    });
  });
};

exports.update = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Sponsor.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        type: req.body.type,
        animal: req.body.animal,
        email: req.body.email,
        website: req.body.website,
        active: req.body.active
      }
    },
    (error, result) => {
      if (error)
        return res
          .status(SponsorMessages.error.e2.http)
          .send(SponsorMessages.error.e2);

      if (result.matchedCount <= 0)
        return res
          .status(SponsorMessages.error.e0.http)
          .send(SponsorMessages.error.e0);

      return res
        .status(SponsorMessages.success.s2.http)
        .send(SponsorMessages.success.s2);
    }
  );
};

exports.delete = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Sponsor.deleteOne({ _id: req.params.id }, (error, result) => {
    if (error)
      return res
        .status(SponsorMessages.error.e3.http)
        .send(SponsorMessages.error.e3);

    if (result.deletedCount <= 0)
      return res
        .status(SponsorMessages.error.e0.http)
        .send(SponsorMessages.error.e0);

    return res
      .status(SponsorMessages.success.s3.http)
      .send(SponsorMessages.success.s3);
  });
};

exports.activate = (req, res) => {
  Sponsor.updateOne(
    { _id: req.params.id },
    { $set: { active: true } },
    (error, result) => {
      if (error)
        return res
          .status(SponsorMessages.error.e0.http)
          .send(SponsorMessages.error.e0);

      return res
        .status(SponsorMessages.success.s5.http)
        .send(SponsorMessages.success.s5);
    }
  );
};

exports.deactivate = (req, res) => {
  Sponsor.updateOne(
    { _id: req.params.id },
    { $set: { active: false } },
    (error, result) => {
      if (error)
        return res
          .status(SponsorMessages.error.e0.http)
          .send(SponsorMessages.error.e0);

      return res
        .status(SponsorMessages.success.s4.http)
        .send(SponsorMessages.success.s4);
    }
  );
};





