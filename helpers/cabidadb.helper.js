"use strict";

const mongoose = require('mongoose');

const CabConstruccionModel = require("../models/cabida/cab.construccion");
const CabDptosModel = require("../models/cabida/cab.dptos");
const CabCocherasModel = require("../models/cabida/cab.cocheras");
const CabPrimerPisoModel = require("../models/cabida/cab.primerpiso");
const CabTerrazaModel = require("../models/cabida/cab.terraza");
const Cabida = require("../models/cabida/cabida");

class CabidaDbHelper {

  constructor(reqbody){
    this.reqbody = reqbody.cabida;
  }

  insertCabidaModel(){
    var cabida = new Cabida({
      construccion: this.insertCabConstruccion(),
      dptos: this.insertCabDptos(),
      cocheras: this.insertCabCocheras(),
      primerpiso: this.insertCabPrimerPiso(),
      terraza: this.insertCabTerraza()
    });
    return cabida;
  }

  insertCabConstruccion(){
    var cabConstruccionModel = new CabConstruccionModel({
      areaTerreno: this.reqbody.cabConstruccion.areaTerreno,
      altura: this.reqbody.cabConstruccion.altura,
      coefAreaConstruida: this.reqbody.cabConstruccion.coefAreaConstruida,
      coefAreaLibre: this.reqbody.cabConstruccion.coefAreaLibre,
      coefAreaComun: this.reqbody.cabConstruccion.coefAreaComun
    });

    return cabConstruccionModel;
  }

  insertCabDptos(){
    var cabDptosModel = new CabDptosModel({
      areaMax: this.reqbody.cabAreasDptos.areaMax,
      areaMid: this.reqbody.cabAreasDptos.areaMid,
      areaMin: this.reqbody.cabAreasDptos.areaMin,
      dormsAreaMax: this.reqbody.cabAreasDptos.dormsAreaMax,
      dormsAreaMid: this.reqbody.cabAreasDptos.dormsAreaMid,
      dormsAreaMin: this.reqbody.cabAreasDptos.dormsAreaMin,
      cocherasPorDormsOption: this.reqbody.cabAreasDptos.cocherasPorDormsOption
    });
    return cabDptosModel;
  }

  insertCabCocheras(){
    var cabCocherasModel = new CabCocherasModel({
      cochVisitas: this.reqbody.cabCocheras.cochVisitas,
      cochPorDpto: this.reqbody.cabCocheras.cochPorDpto,
      areaTechaSotano: this.reqbody.cabCocheras.areaTechaSotano,
      minAreaTechaSotano: this.reqbody.cabCocheras.minAreaTechaSotano,
      areaCochera: this.reqbody.cabCocheras.areaCochera,
      cocherasPorDormsOption: this.reqbody.cabCocheras.cocherasPorDormsOption
    });
    return cabCocherasModel;
  }

  insertCabPrimerPiso(){
    var cabPrimerPisoModel = new CabPrimerPisoModel({
      areaComunAbs: this.reqbody.cabPrimerPisoAreaComun.areaComunAbs,
      areaComunRel: this.reqbody.cabPrimerPisoAreaComun.areaComunRel,
      primerPisoSelection: this.reqbody.cabPrimerPisoAreaComun.primerPisoSelection
    });
    return cabPrimerPisoModel;
  }

  insertCabTerraza(){
    var cabTerrazaModel = new CabTerrazaModel({
      terrazaAreaLibre: this.reqbody.cabTerraza.terrazaAreaLibre,
      terrazaAreaTechada: this.reqbody.cabTerraza.terrazaAreaTechada,
      terrazaOption: this.reqbody.cabTerraza.terrazaOption
    });
    return cabTerrazaModel;
  }

}

module.exports = CabidaDbHelper;
