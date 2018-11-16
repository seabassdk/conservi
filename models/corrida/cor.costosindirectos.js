const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const costosIndirectos = mongoose.Schema({
    _id: false,
    proyectoIndirecto: SchemaTypes.Double,
    licenciaConformidadObra: SchemaTypes.Double,
    autoavaluoPropiedadMayor: SchemaTypes.Double,
    abogadoRegistros: SchemaTypes.Double,
    notariaRegistrosDeptos: SchemaTypes.Double,
    notariaRegistrosTerreno: SchemaTypes.Double,
    alcabala: SchemaTypes.Double,
    demolicion: SchemaTypes.Double,
    serpar: SchemaTypes.Double
});

module.exports = mongoose.model('CostosIndirectosModel', costosIndirectos);

//TO BE TESTED AFTER
// ,
// costosIndirectosPlus:
