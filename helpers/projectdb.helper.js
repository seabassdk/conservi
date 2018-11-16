"use strict";

const mongoose = require('mongoose');

const ProjectMainGen = require("../models/projectGeneral");
const Project = require("../models/project");
const FinanciamientoModel = require("../models/financiamiento");

const CorridaDbHelper = require("./corridadb.helper");
const CabidaDbHelper = require("./cabidadb.helper");

class ProjectDbHelper {

  constructor(reqbody){
    this.reqbody = reqbody;
    this.cabida = new CabidaDbHelper(reqbody);
    this.corrida = new CorridaDbHelper(reqbody);
  }

  insertProjectGenInfo(){
    var projectMainGen = new ProjectMainGen({
      _id: new mongoose.Types.ObjectId(),
      nombreProyecto: this.reqbody.proyectoGen.nombreProyecto ,
      direccion: this.reqbody.proyectoGen.direccion,
      distrito: this.reqbody.proyectoGen.distrito,
      direccionNumero: this.reqbody.proyectoGen.direccionNumero,
      precio: this.reqbody.proyectoGen.precio,
      area: this.reqbody.proyectoGen.area,
      addressObject: JSON.stringify(this.reqbody.proyectoGen.addressObject)
    });
    return projectMainGen;
  }

  insertFinanciamiento(){
    var financiamiento = new FinanciamientoModel({
      finTerrenoTasaAnual: this.reqbody.financiamiento.finTerrenoTasaAnual,
      finTerrenoPeriodoDesembolso: this.reqbody.financiamiento.finTerrenoPeriodoDesembolso,
      finTerrenoPeriodoAmortizacion: this.reqbody.financiamiento.finTerrenoPeriodoAmortizacion,
      finPromotorTasaAnual: this.reqbody.financiamiento.finPromotorTasaAnual,
      finPromotorPeriodoDesembolso: this.reqbody.financiamiento.finPromotorPeriodoDesembolso,
      finPromotorPeriodoAmortizacion: this.reqbody.financiamiento.finPromotorPeriodoAmortizacion,
      coefFinTerrenoAportePropio: this.reqbody.financiamiento.coefFinTerrenoAportePropio,
      coefFinPromotorAportePropio: this.reqbody.financiamiento.coefFinPromotorAportePropio
    });
    return financiamiento;
  }

  insertProject(){
    var project = new Project({
      _id: new mongoose.Types.ObjectId(),
      projectMain:  this.insertProjectGenInfo(),
      cabida: this.cabida.insertCabidaModel(),
      corrida: this.corrida.insertCorridaModel(),
      financiamiento: this.insertFinanciamiento()
    });
    return project;
  }

}

module.exports = ProjectDbHelper;
