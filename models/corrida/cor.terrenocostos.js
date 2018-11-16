const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const terrenoCostos = mongoose.Schema({
    _id: false,
    costoTerrenoSoles: SchemaTypes.Double,
    costoTerrenoSolesMq: SchemaTypes.Double,
    costoTerrenoDolares: SchemaTypes.Double,
    costoTerrenoDolaresMq: SchemaTypes.Double
});

module.exports = mongoose.model('TerrenoCostosModel', terrenoCostos);
