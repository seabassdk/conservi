const mongoose = require('mongoose');

const cabidaModel = require("./cabida/cabida");
const projectMainInfoModel = require("./projectGeneral");
const corridaSchema = require("./corrida/corrida");
const FinanciamientoModel = require('./financiamiento');

const projecSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectMain: projectMainInfoModel.schema,
    cabida:  cabidaModel.schema,
    corrida: corridaSchema.schema,
    financiamiento: FinanciamientoModel.schema
});

module.exports = mongoose.model('Project', projecSchema);
