const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const construccionSchema = mongoose.Schema({
    _id: false,
    areaTerreno: SchemaTypes.Double,
    altura: SchemaTypes.Double,
    coefAreaConstruida: SchemaTypes.Double,
    coefAreaLibre: SchemaTypes.Double,
    coefAreaComun: SchemaTypes.Double
});

module.exports = mongoose.model('CabConstruccionModel', construccionSchema);
