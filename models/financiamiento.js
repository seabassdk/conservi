const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const financiamiento = mongoose.Schema({
    _id: false,
    finTerrenoTasaAnual: SchemaTypes.Double,
    finTerrenoPeriodoDesembolso: SchemaTypes.Double,
    finTerrenoPeriodoAmortizacion: SchemaTypes.Double,
    finPromotorTasaAnual: SchemaTypes.Double,
    finPromotorPeriodoDesembolso: SchemaTypes.Double,
    finPromotorPeriodoAmortizacion: SchemaTypes.Double,
    coefFinTerrenoAportePropio: SchemaTypes.Double,
    coefFinPromotorAportePropio: SchemaTypes.Double
  });

module.exports = mongoose.model('FinanciamientoModel', financiamiento);
