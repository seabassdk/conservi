const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const costosDirectos = mongoose.Schema({
    _id: false,
    costoConstruccionSotano: SchemaTypes.Double,
    costoConstruccionDptos: SchemaTypes.Double,
    costoConstruccionAreaComun: SchemaTypes.Double,
    sistemaContraincendio: SchemaTypes.Double,
    extraccionMonoxido: SchemaTypes.Double,
    ascensor: SchemaTypes.Double,
    ascensorCantidad: SchemaTypes.Double,
    bombasElectricas: SchemaTypes.Double,
    bombasElectricasCantidad: SchemaTypes.Double,
    costosDirectosPlus: [{
      nombre: String,
      costo: SchemaTypes.Double    
    }]
});

module.exports = mongoose.model('CostosDirectosModel', costosDirectos);

//TO BE TESTED AFTER
// ,
// costosDirectosPlus: SchemaTypes.Double
