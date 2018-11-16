const express = require('express'),
      router = express.Router();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const util = require('util');

const ProjectMainGen = require("../models/projectGeneral");
const Project = require("../models/project");

const CabidaCalculations = require("../tables/cabidaCalculations");
const PrimerPisoResults = require("../tables/resultsPrimerPiso");
const TipicoPisoResults = require("../tables/resultsTipicoPiso");
const CocherasResults = require("../tables/resultsCocheras");
const VentasResults = require("../tables/resultsVentas");
const CostosResults = require("../tables/resultsCostos");
const FinanciamientoResults = require("../tables/resultsFinanciero");

const ProjectDbHelper = require("../helpers/projectdb.helper");


router.post('/insertCorrida', (req, res, next) => {

  var projectHelper = new ProjectDbHelper(req.body);

  var project = projectHelper.insertProject();
  project
    .save()
    .then(result => {
      res.status(201).json({
        message: "Successfully saved."
      });
    })
    .catch(err => {
      console.log('error: sending error to client');
      res.status(500).json({
        error: err
      });
    });
});

router.get("/getCorridas", (req, res, next) => {
  var returnSelection = [];
  var tmp;
  Project.find({})
    .exec()
    .then(doc => {
      for(let corrida of doc){
        tmp = {
          id: corrida._id,
          nombre: corrida.projectMain.nombreProyecto,
          direccion: corrida.projectMain.direccion
        }
        returnSelection.push(tmp);
      }
      res.status(200).json(returnSelection);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/getCorrida", (req, res, next) => {
  var id = req.query.id;
  // console.log('all the queries: ' + req.query.id);

  Project.findById(id)
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


router.post('/getCabidaTables', (req, res, next) => {
    var type = req.query.type;

    var cabidaTables = [];

    var object = JSON.parse(JSON.stringify(req.body));
    var reqbody = toFloat(object);

    var primerPisoResults = new PrimerPisoResults(reqbody);
    var tipicoPisoResults = new TipicoPisoResults(reqbody);
    var cocheras = new CocherasResults(reqbody, primerPisoResults, tipicoPisoResults);

    if(type === 'PRIDPTOS'){
      var primerPisoDptosTable =  primerPisoResults.getDepartamentosTable(false);
      cabidaTables.push(...primerPisoDptosTable);
    }

    if(type === 'PRIDPTOSTOTAL'){
      var primerPisoDptosTotalTable = primerPisoResults.getTotalPisoTable();
      cabidaTables.push(...primerPisoDptosTotalTable);
    }

    if(type === 'TIPDPTOS'){
      var tipicoPisoDptosTable = tipicoPisoResults.getDepartamentosTable(false);
      cabidaTables.push(...tipicoPisoDptosTable);
    }

    if(type === 'TIPDPTOSTOTAL'){
      var tipicoPisoDptosTotalTable = tipicoPisoResults.getTotalPisoTable();
      cabidaTables.push(...tipicoPisoDptosTotalTable);
    }

      // tipicoPisoColumns = ['terrazaAptNumber', 'terrazaAptType','terrazaAptAreaTechada','terrazaAptAreaLibre','terrazaAptCocheras'];
    if(type === 'TERDPTOS'){
      if(tipicoPisoResults.terrazaOption){
        var terrazaPisoDptosTable = tipicoPisoResults.getDepartamentosTerrazaTable(false);
        cabidaTables.push(...terrazaPisoDptosTable);

      }else {
        //send an error to cancel table creation
      }
    }

    if(type === 'TERDPTOSTOTAL'){
      if(tipicoPisoResults.terrazaOption){
        var terrazaPisoDptosTotalTable = tipicoPisoResults.getTotalPisoTerTable();
        cabidaTables.push(...terrazaPisoDptosTotalTable);
      }else {
        //send an error to cancel table creation
      }
    }


    if(type === 'TOTAL'){
      //iterate over the number of apartments and add them
      var totalTable = tipicoPisoResults.getTotalOfTotals(
                                                          primerPisoResults.getTotalPisoTable(),
                                                          tipicoPisoResults.getTotalPisoTable(),
                                                          tipicoPisoResults.getTotalPisoTerTable(),
                                                          cocheras
                                                          );
      cabidaTables.push(...totalTable);
    }

    if(type === 'COCHERAS'){
      var cocherasTable = cocheras.getCocherasTable();

      cabidaTables.push(...cocherasTable);
    }

    if(type === 'SOTANOS'){
      var sotanosTable = cocheras.getSotanosTable();
      cabidaTables.push(...sotanosTable);
    }

    if(type === 'VENTAS'){
      var ventas = new VentasResults(primerPisoResults,tipicoPisoResults,cocheras);
      var ventasTable = ventas.getVentasTable();
      cabidaTables.push(...ventasTable);
    }

  res.send(cabidaTables);

});

router.post('/getCorridaTables', (req, res, next) => {
  var type = req.query.type;
  var cabidaTables = [];

  var object = JSON.parse(JSON.stringify(req.body));
  var reqbody = toFloat(object);

  var primerPisoResults = new PrimerPisoResults(reqbody);
  var tipicoPisoResults = new TipicoPisoResults(reqbody);
  var cocheras = new CocherasResults(reqbody, primerPisoResults, tipicoPisoResults);
  var ventas =  new VentasResults(primerPisoResults, tipicoPisoResults, cocheras);

  var costos = new CostosResults(reqbody, primerPisoResults, tipicoPisoResults, ventas, cocheras);
  var financiamiento = new FinanciamientoResults(reqbody, costos);

  var costosTable = [];
  if(type === 'DIRECTOS'){
    costosTable = costos.getCostosDirectosTable();
  }
  if(type === 'INDIRECTOS'){
    costosTable = costos.getCostosIndirectosTable();
  }
  if(type === 'COSTOSTOTALES'){
    //Financiamiento
    let interesTotalTerreno = financiamiento.getInterestAmountTerreno();
    let interesTotalPromotor = financiamiento.getInterestAmountPromotor();
    // this.interesTotal = this.interesTotalTerreno + this.interesTotalPromotor;
    costosTable = costos.getCostosTotalesTable(interesTotalTerreno, interesTotalPromotor);
  }

  if(type === 'UTILIDAD'){
    //Financiamiento
    let interesTotalTerreno = financiamiento.getInterestAmountTerreno();
    let interesTotalPromotor = financiamiento.getInterestAmountPromotor();
    // this.interesTotal = this.interesTotalTerreno + this.interesTotalPromotor;
    costosTable = costos.getUtilidadProyectoTable(interesTotalTerreno, interesTotalPromotor);
  }

  if(type === 'GESTION'){
    //Financiamiento
    let interesTotalTerreno = financiamiento.getInterestAmountTerreno();
    let interesTotalPromotor = financiamiento.getInterestAmountPromotor();
    costosTable  = costos.getRatiosGestionTable(interesTotalTerreno, interesTotalPromotor, financiamiento.coefFinTerrenoAportePropio);

  }

  res.send(costosTable);

});

function toFloat(o) {
  if(Array.isArray(o)){

    var i;
    for(i=0; i < o.length; i++){
      toFloat(o[i]);
    }

  }
  else {

    Object.keys(o).forEach(k => {

      if(o[k] !== null){
        if (typeof o[k] === 'object') {
          return toFloat(o[k]);
        }

        if(isNaN(parseFloat(o[k]))){
          if( k !== 'nombre' &&
              k !== 'addressObject' &&
              k !== 'terrazaOption' &&
              k !== 'nombreProyecto: ' &&
              k !== 'direccion' &&
              k !== 'distrito' &&
              k !== 'direccionNumero' &&
              k !== 'cocherasPorDormsOption' &&
              k !== 'terrazaOption'){
            o[k] = 0;
          }else{
            //leave it as it is
          }
        }else {
          o[k] = parseFloat(o[k])
        }
      }
    });
    return o;
  }

}

module.exports = router;
