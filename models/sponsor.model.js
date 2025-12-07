// models/sponsor.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config'); // 💡 Importar CONFIG para a coleção

let SponsorSchema = new Schema({
    name:    { type: String, required: true },
    type:    { type: String, required: true },
    animal:  { type: String, required: true },
    email:   { type: String, required: true },
    website: { type: String, required: true },
    active:  { type: Boolean, default: true }
});

// ✅ CORREÇÃO: Usar a conexão global (global.mongoConnection) e o nome da coleção do config
module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.sponsor, SponsorSchema);


