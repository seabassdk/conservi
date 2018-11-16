const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const generalInfo = mongoose.Schema({
    _id: false,
    areaTerreno: SchemaTypes.Double,
    cambio: SchemaTypes.Double
});

module.exports = mongoose.model('GeneralInfoModel', generalInfo);
