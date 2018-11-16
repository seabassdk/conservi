const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const proyectoVentas = mongoose.Schema({
    _id: false,
    ventasSolesMq: SchemaTypes.Double,
    ventasDolaresMq: SchemaTypes.Double,
    ventasCocherasSolesMq: SchemaTypes.Double,
    ventasCocherasDolaressMq: SchemaTypes.Double,
    ventasCoeffAreaLibre: SchemaTypes.Double
});

module.exports = mongoose.model('ProyectoVentasModel', proyectoVentas);
