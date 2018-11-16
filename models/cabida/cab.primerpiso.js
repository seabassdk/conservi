const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const primerPisoSchema = mongoose.Schema({
    _id: false,
    areaComunAbs: SchemaTypes.Double,
    areaComunRel: SchemaTypes.Double,
    primerPisoSelection: Number
});

module.exports = mongoose.model('CabPrimerPisoModel', primerPisoSchema);
