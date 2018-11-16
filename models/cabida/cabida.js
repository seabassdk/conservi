const mongoose = require('mongoose');

const cabConstruccionModel = require("./cab.construccion");
const cabDptosModel = require("./cab.dptos");
const cabCocherasModel = require("./cab.cocheras");
const cabPrimerPisoModel = require("./cab.primerpiso");
const cabTerrazaModel = require("./cab.terraza");

const cabidaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    construccion: cabConstruccionModel.schema,
    dptos: cabDptosModel.schema,
    cocheras: cabCocherasModel.schema,
    primerpiso: cabPrimerPisoModel.schema,
    terraza: cabTerrazaModel.schema
});

module.exports = mongoose.model('CabidaModel', cabidaSchema);
