// controllers/auth.controller.js
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../models/user.model");
const AuthMessages = require("../messages/auth.messages");
const CONFIG = require("../config/config");

// Middleware de autenticação
exports.checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Token não fornecido" });
  }

  try {
    // Decodifica o token para pegar a chave pública
    const decoded = JWT.decode(token, { complete: true });
    
    if (!decoded) {
      return res.status(401).send({ message: "Token inválido" });
    }

    // Busca o usuário pela chave pública
    User.findOne({ "auth.public_key": decoded.payload.pk }, (error, user) => {
      if (error || !user) {
        return res.status(401).send({ message: "Usuário não encontrado" });
      }

      // Verifica o token com a chave privada do usuário
      JWT.verify(token, user.auth.private_key, (err, verified) => {
        if (err) {
          return res.status(401).send({ message: "Token inválido ou expirado" });
        }
        
        req.user = user; // Adiciona o usuário ao request para usar nas rotas
        next();
      });
    });
  } catch (error) {
    return res.status(401).send({ message: "Erro ao verificar token" });
  }
};

// Login
exports.login = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) {
    return res.status(406).send(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ "auth.username": username }, (error, user) => {
    if (error) throw error;

    if (!user || !bcrypt.compareSync(password, user.auth.password)) {
      return res
        .header("Authorization", null)
        .status(AuthMessages.error.e0.http)
        .send(AuthMessages.error.e0);
    }

    const payload = { pk: user.auth.public_key };

    const options = {
      expiresIn: CONFIG.auth.expiration_time,
      issuer: CONFIG.auth.issuer
    };

    const token = JWT.sign(payload, user.auth.private_key, options);

    let message = AuthMessages.success.s0;
    message.body = user;

    return res
      .header("Authorization", token)
      .status(message.http)
      .send(message);
  });
};

// Obter informações do usuário autenticado
exports.getInfo = (req, res) => {
  // O usuário já vem do middleware checkAuth em req.user
  let message = AuthMessages.success.s1;
  message.body = req.user;

  return res
    .status(message.http)
    .send(message);
};


