const mongoose = require('mongoose');

const GeneralInfoModel = require("./cor.geninfo");
const TerrenoCostosModel = require("./cor.terrenocostos");
const ProyectoVentasModel = require("./cor.ventas");
const CostosDirectosModel = require("./cor.costosdirectos");
const CostosIndirectosModel = require("./cor.costosindirectos");

const corridaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    generalInfo: GeneralInfoModel.schema,
    terrenoCostos: TerrenoCostosModel.schema,
    proyectoVentas: ProyectoVentasModel.schema,
    costosDirectos: CostosDirectosModel.schema,
    costosIndirectos: CostosIndirectosModel.schema

});

module.exports = mongoose.model('CorridaSchemaModel', corridaSchema);
