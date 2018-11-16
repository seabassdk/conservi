"use strict";

const mongoose = require('mongoose');

const GeneralInfoModel = require("../models/corrida/cor.geninfo");
const TerrenoCostosModel = require("../models/corrida/cor.terrenocostos");
const ProyectoVentasModel = require("../models/corrida/cor.ventas");
const CostosDirectosModel = require("../models/corrida/cor.costosdirectos");
const CostosIndirectosModel = require("../models/corrida/cor.costosindirectos");
const CorridaSchemaModel = require("../models/corrida/corrida");

class CorridaDbHelper {

  constructor(reqbody){
    this.reqbody = reqbody.corrida;
  }

  insertGeneralInfo(){
    var generalInfo = new GeneralInfoModel({
      areaTerreno: this.reqbody.generalInfo.altura,
      cambio: this.reqbody.generalInfo.coefAreaConstruida
    });
    return generalInfo;
  }

  insertTerrenoCostos(){
    var terrenoCostos = new TerrenoCostosModel({
      costoTerrenoSoles: this.reqbody.terrenoCostos.costoTerrenoSoles,
      costoTerrenoSolesMq: this.reqbody.terrenoCostos.costoTerrenoSolesMq,
      costoTerrenoDolares: this.reqbody.terrenoCostos.costoTerrenoDolares,
      costoTerrenoDolaresMq: this.reqbody.terrenoCostos.costoTerrenoDolaresMq
    });
    return terrenoCostos;
  }

  insertProyectoVentas(){
    var proyectoVentas = new ProyectoVentasModel({
      ventasSolesMq: this.reqbody.proyectoVentas.ventasSolesMq,
      ventasDolaresMq: this.reqbody.proyectoVentas.ventasDolaresMq,
      ventasCocherasSolesMq: this.reqbody.proyectoVentas.ventasCocherasSolesMq,
      ventasCocherasDolaressMq: this.reqbody.proyectoVentas.ventasCocherasDolaressMq,
      ventasCoeffAreaLibre: this.reqbody.proyectoVentas.ventasCoeffAreaLibre
    });
    return proyectoVentas;
  }

  insertCostosDirectos(){
    var costosDirectos = new CostosDirectosModel({
      costoConstruccionSotano: this.reqbody.costosDirectos.costoConstruccionSotano,
      costoConstruccionDptos: this.reqbody.costosDirectos.costoConstruccionDptos,
      costoConstruccionAreaComun: this.reqbody.costosDirectos.costoConstruccionAreaComun,
      sistemaContraincendio: this.reqbody.costosDirectos.sistemaContraincendio,
      extraccionMonoxido: this.reqbody.costosDirectos.extraccionMonoxido,
      ascensor: this.reqbody.costosDirectos.ascensor,
      ascensorCantidad: this.reqbody.costosDirectos.ascensorCantidad,
      bombasElectricas: this.reqbody.costosDirectos.bombasElectricas,
      bombasElectricasCantidad: this.reqbody.costosDirectos.bombasElectricasCantidad,
      costosDirectosPlus : this.reqbody.costosDirectos.costosDirectosPlus
    });
    return costosDirectos;
  }

  insertCostosIndirectos(){
    var costosIndirectos = new CostosIndirectosModel({
      proyectoIndirecto: this.reqbody.costosIndirectos.proyectoIndirecto,
      licenciaConformidadObra: this.reqbody.costosIndirectos.licenciaConformidadObra,
      autoavaluoPropiedadMayor: this.reqbody.costosIndirectos.autoavaluoPropiedadMayor,
      abogadoRegistros: this.reqbody.costosIndirectos.abogadoRegistros,
      notariaRegistrosDeptos: this.reqbody.costosIndirectos.notariaRegistrosDeptos,
      notariaRegistrosTerreno: this.reqbody.costosIndirectos.notariaRegistrosTerreno,
      alcabala: this.reqbody.costosIndirectos.alcabala,
      demolicion: this.reqbody.costosIndirectos.demolicion,
      serpar: this.reqbody.costosIndirectos.serpar
    });
    return costosIndirectos;
  }

  insertCorridaModel(){
    var corridaSchema = new CorridaSchemaModel({
      _id: new mongoose.Types.ObjectId(),
      generalInfo: this.insertGeneralInfo(),
      terrenoCostos: this.insertTerrenoCostos(),
      proyectoVentas: this.insertProyectoVentas(),
      costosDirectos: this.insertCostosDirectos(),
      costosIndirectos: this.insertCostosIndirectos()
    });
    return corridaSchema;
  }

}

module.exports = CorridaDbHelper;
