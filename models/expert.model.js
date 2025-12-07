// models/expert.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config'); // 💡 PASSO 1: Importar CONFIG

let ExpertSchema = new Schema({
    name: 	   { type: String, required: true },
    country: 	   { type: String, required: true },
    email: 	   { type: String, required: true },
    institution: { type: String, required: true },
    animal: 	   { type: String, required: true },
    active: 	   { type: Boolean, default: true }
});

// ✅ CORREÇÃO: Usar a conexão global (global.mongoConnection) e o nome da coleção do config
module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.expert, ExpertSchema);


