const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const dptosSchema = mongoose.Schema({
    _id: false,
    areaMax: SchemaTypes.Double,
    areaMid: SchemaTypes.Double,
    areaMin: SchemaTypes.Double,
    dormsAreaMax: SchemaTypes.Double,
    dormsAreaMid: SchemaTypes.Double,
    dormsAreaMin: SchemaTypes.Double,
    cocherasPorDormsOption: Boolean
});

module.exports = mongoose.model('CabDptosModel', dptosSchema);
