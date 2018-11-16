const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const cocherasSchema = mongoose.Schema({
    _id: false,
    cochVisitas: SchemaTypes.Double,
    cochPorDpto: SchemaTypes.Double,
    areaTechaSotano: SchemaTypes.Double,
    minAreaTechaSotano: SchemaTypes.Double,
    areaCochera: SchemaTypes.Double,
    cocherasPorDormsOption: Boolean
});

module.exports = mongoose.model('CabCocherasModel', cocherasSchema);
