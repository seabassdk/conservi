"use strict";

class VentasResults{

  constructor(primerPiso, tipicoPiso, cocheras){
    this.primerPisoResults = primerPiso;
    this.tipicoPisoResults = tipicoPiso;
    this.cocheras = cocheras;
  }

  getVentasTable(){
    var pisos = this.tipicoPisoResults.altura;
    var pisosTipico = this.tipicoPisoResults.altura - 1;
    var totalTable = this.tipicoPisoResults.getTotalOfTotals(
                                                        this.primerPisoResults.getTotalPisoTable(),
                                                        this.tipicoPisoResults.getTotalPisoTable(),
                                                        this.tipicoPisoResults.getTotalPisoTerTable(),
                                                        this.cocheras
                                                        );

    var totalCocheras = totalTable[0].totalcocheras;
    var totalApartments = totalTable[0].totalApts;

    var terrazaPisoDptosTable;
    if(this.tipicoPisoResults.terrazaOption){
      terrazaPisoDptosTable = this.tipicoPisoResults.getDepartamentosTerrazaTable(true);
      pisosTipico = pisosTipico - 1;
    } else {
      terrazaPisoDptosTable = [];
    }

    var primerPisoDptosTable =  this.primerPisoResults.getDepartamentosTable(true);
    var tipicoPisoDptosTable = this.tipicoPisoResults.getDepartamentosTable(true);

    var iterations = totalApartments;

    //iterate over the number of apartments
    var i;
    var j;
    var aptNumberPrefix;
    var count = 1;
    var ventasTable = [];
    // ventasDptoCount: '',
    // ventasDptoNum: '',

    for(i = 0; i < primerPisoDptosTable.length; i++){
      primerPisoDptosTable[i].ventasDptoCount = count;
      primerPisoDptosTable[i].ventasDptoNum = '10' + (i + 1);
      count++;
      ventasTable.push(JSON.parse(JSON.stringify(primerPisoDptosTable[i])));
    }

    for(i = 2; i < pisosTipico + 2; i++){
      for(j = 0; j < tipicoPisoDptosTable.length; j++){
        tipicoPisoDptosTable[j].ventasDptoCount = count;
        tipicoPisoDptosTable[j].ventasDptoNum = i + "0" + (j + 1);
        count++;
        ventasTable.push(JSON.parse(JSON.stringify(tipicoPisoDptosTable[j])));
      }
    }

    for(i = 0; i < terrazaPisoDptosTable.length; i++){
      terrazaPisoDptosTable[i].ventasDptoCount = count;
      terrazaPisoDptosTable[i].ventasDptoNum = pisos + '0' + (i + 1);
      count++;
      ventasTable.push(JSON.parse(JSON.stringify(terrazaPisoDptosTable[i])));
    }

    //add the total row
    let totalVentasMq = ventasTable[0].ventasPrecioDptoMq;
    let totalventasAT = 0;
    let totalventasAL = 0;
    let totalventasAO = 0;
    let totalventasDptos = 0;
    let totalventasDptosSE = 0;
    let totalventasCocheras = 0;
    for(i=0; i<ventasTable.length; i++){
      totalventasAT = totalventasAT + ventasTable[i].ventasAreaTechada;
      totalventasAL = totalventasAL + ventasTable[i].ventasAreaLibre;
      totalventasAO = totalventasAO + ventasTable[i].ventasAreaOcupada;
      totalventasDptos = totalventasDptos + ventasTable[i].ventasPrecioDpto;
      totalventasCocheras = totalventasCocheras + ventasTable[i].ventasPrecioCochera;
      totalventasDptosSE = totalventasDptosSE + ventasTable[i].ventasPrecioDptoSinCochera;
    }
    //add cocheras adicionales
    let cocherasAdicionales = this.cocheras.getCocherasAdicionales();
    let cocherasAdicionalesVenta = cocherasAdicionales * ventasTable[0].ventasPrecioCochera;
    let totalCocherasAdicionalesRow = {  ventasDptoCount: '',
                      ventasDptoNum: '',
                      ventasDptoTipo: 'TOTAL Cocheras Adicionales ' + cocherasAdicionales,
                      ventasAreaTechada: '',
                      ventasAreaLibre: '',
                      ventasAreaOcupada: '',
                      ventasPrecioDpto: '',
                      ventasPrecioCochera: cocherasAdicionalesVenta,
                      ventasPrecioDptoMq: '',
                      ventasPrecioDptoSinCochera: ''};
    ventasTable.push(totalCocherasAdicionalesRow);

    totalventasCocheras = totalventasCocheras + cocherasAdicionalesVenta;

    let totalRow = {  ventasDptoCount: '',
                      ventasDptoNum: '',
                      ventasDptoTipo: 'TOTAL:',
                      ventasAreaTechada: totalventasAT,
                      ventasAreaLibre: totalventasAL,
                      ventasAreaOcupada: totalventasAO,
                      ventasPrecioDpto: totalventasDptos,
                      ventasPrecioCochera: totalventasCocheras,
                      ventasPrecioDptoMq: totalVentasMq,
                      ventasPrecioDptoSinCochera: totalventasDptosSE};
    ventasTable.push(totalRow);

    return ventasTable;
  }

  getTotalVentas(){
    var pisos = this.tipicoPisoResults.altura;
    var pisosTipico = this.tipicoPisoResults.altura - 1;
    var totalTable = this.tipicoPisoResults.getTotalOfTotals(
                                                        this.primerPisoResults.getTotalPisoTable(),
                                                        this.tipicoPisoResults.getTotalPisoTable(),
                                                        this.tipicoPisoResults.getTotalPisoTerTable(),
                                                        this.cocheras
                                                        );

    var totalCocheras = totalTable[0].totalcocheras;
    var totalApartments = totalTable[0].totalApts;

    var terrazaPisoDptosTable;
    if(this.tipicoPisoResults.terrazaOption){
      terrazaPisoDptosTable = this.tipicoPisoResults.getDepartamentosTerrazaTable(true);
      pisosTipico = pisosTipico - 1;
    } else {
      terrazaPisoDptosTable = [];
    }

    var primerPisoDptosTable =  this.primerPisoResults.getDepartamentosTable(true);
    var tipicoPisoDptosTable = this.tipicoPisoResults.getDepartamentosTable(true);

    var iterations;
    if(totalCocheras >= totalApartments){
      iterations = totalCocheras;
    }else{
      iterations = totalApartments;
    }

    //iterate over the number of apartments or cocheras
    var i;
    var j;
    var aptNumberPrefix;
    var count = 1;
    var ventasTable = [];
    // ventasDptoCount: '',
    // ventasDptoNum: '',

    for(i = 0; i < primerPisoDptosTable.length; i++){
      primerPisoDptosTable[i].ventasDptoCount = count;
      primerPisoDptosTable[i].ventasDptoNum = '10' + (i + 1);
      count++;
      ventasTable.push(JSON.parse(JSON.stringify(primerPisoDptosTable[i])));
    }

    for(i = 2; i < pisosTipico + 2; i++){
      for(j = 0; j < tipicoPisoDptosTable.length; j++){
        tipicoPisoDptosTable[j].ventasDptoCount = count;
        tipicoPisoDptosTable[j].ventasDptoNum = i + "0" + (j + 1);
        count++;
        ventasTable.push(JSON.parse(JSON.stringify(tipicoPisoDptosTable[j])));
      }
    }

    for(i = 0; i < terrazaPisoDptosTable.length; i++){
      terrazaPisoDptosTable[i].ventasDptoCount = count;
      terrazaPisoDptosTable[i].ventasDptoNum = pisos + '0' + (i + 1);
      count++;
      ventasTable.push(JSON.parse(JSON.stringify(terrazaPisoDptosTable[i])));
    }

    //add the total row
    let totalVentasMq = ventasTable[0].ventasPrecioDptoMq;
    let totalventasAT = 0;
    let totalventasAL = 0;
    let totalventasAO = 0;
    let totalventasDptos = 0;
    let totalventasCocheras = 0;
    let totalventasDptosSE = 0;

    for(i=0; i<ventasTable.length; i++){
      totalventasAT = totalventasAT + ventasTable[i].ventasAreaTechada;
      totalventasAL = totalventasAL + ventasTable[i].ventasAreaLibre;
      totalventasAO = totalventasAO + ventasTable[i].ventasAreaOcupada;
      totalventasDptos = totalventasDptos + ventasTable[i].ventasPrecioDpto;
      totalventasCocheras = totalventasCocheras + ventasTable[i].ventasPrecioCochera;
      totalventasDptosSE = totalventasDptosSE + ventasTable[i].ventasPrecioDptoSinCochera;
    }

    let cocherasAdicionalesVenta = this.cocheras.getCocherasAdicionales() * ventasTable[0].ventasPrecioCochera;
    totalventasCocheras = totalventasCocheras + cocherasAdicionalesVenta;

    let totalRow = {  ventasDptoCount: '',
                      ventasDptoNum: '',
                      ventasDptoTipo: 'TOTAL:',
                      ventasAreaTechada: totalventasAT,
                      ventasAreaLibre: totalventasAL,
                      ventasAreaOcupada: totalventasAO,
                      ventasPrecioDpto: totalventasDptos,
                      ventasPrecioCochera: totalventasCocheras,
                      ventasPrecioDptoMq: totalVentasMq,
                      ventasPrecioDptoSinCochera: totalventasDptosSE};

    return totalRow;
  }
}

module.exports = VentasResults;
