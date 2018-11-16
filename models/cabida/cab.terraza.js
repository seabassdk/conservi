const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const terrazaSchema = mongoose.Schema({
    _id: false,
    terrazaAreaLibre: SchemaTypes.Double,
    terrazaAreaTechada: SchemaTypes.Double,
    terrazaOption: Boolean
});

module.exports = mongoose.model('CabTerrazaModel', terrazaSchema);
