"use strict";

class TipicoPisoResults {

  constructor(proyectoinputs){
        this.areaTerreno = proyectoinputs.cabida.cabConstruccion.areaTerreno
        this.altura = proyectoinputs.cabida.cabConstruccion.altura;
        this.coefAreaConstruida = proyectoinputs.cabida.cabConstruccion.coefAreaConstruida;
        this.coefAreaLibre = proyectoinputs.cabida.cabConstruccion.coefAreaLibre;
        this.coefAreaComun = proyectoinputs.cabida.cabConstruccion.coefAreaComun;
        this.areaMax = proyectoinputs.cabida.cabAreasDptos.areaMax;
        this.areaMid = proyectoinputs.cabida.cabAreasDptos.areaMid;
        this.areaMin = proyectoinputs.cabida.cabAreasDptos.areaMin;
        this.dormsAreaMax = proyectoinputs.cabida.cabAreasDptos.dormsAreaMax;
        this.dormsAreaMid = proyectoinputs.cabida.cabAreasDptos.dormsAreaMid;
        this.dormsAreaMin = proyectoinputs.cabida.cabAreasDptos.dormsAreaMin;
        this.cocherasPorDormsOption = proyectoinputs.cabida.cabAreasDptos.cocherasPorDormsOption;
        this.areaComunAbs = proyectoinputs.cabida.cabPrimerPisoAreaComun.areaComunAbs;
        this.areaComunRel = proyectoinputs.cabida.cabPrimerPisoAreaComun.areaComunRel;
        this.primerPisoSelection = proyectoinputs.cabida.cabPrimerPisoAreaComun.primerPisoSelection;
        this.terrazaAreaLibre = proyectoinputs.cabida.cabTerraza.terrazaAreaLibre;
        this.terrazaAreaTechada = proyectoinputs.cabida.cabTerraza.terrazaAreaTechada;
        this.terrazaOption = proyectoinputs.cabida.cabTerraza.terrazaOption;
        this.cochPorDpto = proyectoinputs.cabida.cabCocheras.cochPorDpto;
        this.areaCochera = proyectoinputs.cabida.cabCocheras.areaCochera;

        //Ventas
        this.ventasDolaresMq = proyectoinputs.corrida.proyectoVentas.ventasDolaresMq;
        this.ventasCocherasDolaressMq = proyectoinputs.corrida.proyectoVentas.ventasCocherasDolaressMq;
        this.ventasCoeffAreaLibre = proyectoinputs.corrida.proyectoVentas.ventasCoeffAreaLibre;
  }

  //area areaTechada
  getAreaTechada(){
    return this.areaTerreno * (this.coefAreaConstruida  / 100);
  }

  //area comun
  getAreaComun(){
      return this.getAreaTechada() * (this.coefAreaComun /100);
  }

  //area vendible
  getAreaVendible(){
    return this.getAreaTechada() - this.getAreaComun();
  }

  //The following functions assume that maximum area apartments are preferred

  //dptos por piso
  getDptosPorPiso(){
    if(this.extraDpto())
      return (Math.floor(this.getAreaVendible()/this.areaMax)) + 1;
    if(this.duplex())
      return (Math.floor(this.getAreaVendible()/this.areaMax)) + 0.5;

    return Math.floor(this.getAreaVendible()/this.areaMax);

  }

  //area restante
  getAreaRestante(){
    return this.getAreaVendible() % this.areaMax;
  }

  extraDpto(){
    if(this.getAreaRestante() >= this.areaMin )
      return true;
    else
      return false
  }

  //in the case of terraza check option on whether to add triplex
  duplex(){
    if(this.extraDpto()===false){
      let duplexArea = this.getAreaRestante() + this.getAreaRestante();
      if(duplexArea >= this.areaMin)
        return true;
    }
    return false;
  }

  distribuirAreaRestante(){
    if(this.getAreaRestante() > 0 && this.duplex() === false && this.extraDpto() === false){
      return true;
    }
    return false;

  }

  getTerrazaAreaVendibleTotal(){
    if(this.terrazaOption)
      return this.getAreaVendible() * (this.terrazaAreaTechada/100);
    else
      return 0;
  }

  getTerrazaAreaLibreTotal(){
    if(this.terrazaOption)
      return this.getAreaVendible() * (this.terrazaAreaLibre/100);
    else
      return 0;
  }

  getTerrazaAreaVendibleDpto(areaTipicoDpto){
    if(this.terrazaOption)
      return areaTipicoDpto * (this.terrazaAreaTechada/100);
    else
      return 0;
  }

  getTerrazaAreaLibreDpto(areaTipicoDpto){
    if(this.terrazaOption)
      return areaTipicoDpto * (this.terrazaAreaLibre/100);
    else
      return 0;
  }

  getCantidadCocherasPorPiso(){
    //cocheras por dormitorio
    if(this.cocherasPorDormsOption === true){
      if(this.distribuirAreaRestante()){
        return Math.floor(this.getAreaVendible()/this.areaMax) * this.dormsAreaMax;
      }else if (this.extraDpto()){
        if(this.getAreaRestante() >= this.areaMin && this.getAreaRestante() < this.areaMid){
          return (Math.floor(this.getAreaVendible()/this.areaMax) * this.dormsAreaMax) + this.dormsAreaMin;
        }
        else
          return (Math.floor(this.getAreaVendible()/this.areaMax) * this.dormsAreaMax) + this.dormsAreaMid;
      }else{
        let duplexArea = this.getAreaRestante() + this.getAreaRestante();
        if(duplexArea >= this.areaMin && duplexArea< this.areaMid){
          return (Math.floor(this.getAreaVendible()/this.areaMax) * this.dormsAreaMax) + this.dormsAreaMin;
        }else{
          return (Math.floor(this.getAreaVendible()/this.areaMax) * this.dormsAreaMax) + this.dormsAreaMid;
        }
      }
    }else{
      if(this.extraDpto())
        return ((Math.floor(this.getAreaVendible()/this.areaMax)) + 1) * this.cochPorDpto ;
      if(this.duplex())
        return ((Math.floor(this.getAreaVendible()/this.areaMax)) + 0.5) * this.cochPorDpto ;

      return Math.floor(this.getAreaVendible()/this.areaMax) * this.cochPorDpto;

    }
  }

  isLastFloorDifferent(){
    if(this.altura % 2 !== 0 && this.duplex()=== true)
      return true;
    else
      return false;

  }


  //Calculations for tables

  getCocherasPorDpto(area){
    if(this.cocherasPorDormsOption === true){
      if(area >= this.areaMax){
        return this.dormsAreaMax;
      }else if(area < this.areaMax && area >= this.areaMid){
        return this.dormsAreaMid;
      }else{
        return this.dormsAreaMin;
      }
    }else{
      return this.cochPorDpto;
    }
  }

  getApartmentType(area){
    if(area > this.areaMax)
      return 'Area Maxima ++';
    else if (area === this.areaMax)
      return 'Area Maxima';
    else if (area >= this.areaMid)
      return 'Area Mediana ++';
    else if (area >= this.areaMin)
      return 'Area Minima ++';
    else
      return 'duplex';
  }

  getDepartamentosTable(isVentasTable) {
    //how many times to loop? amount of apartments...
    var aptRows = [];


    var dptos = this.getDptosPorPiso();
    var loop = dptos + 1;
    var duplex = this.duplex();
    var areaVendible = this.getAreaVendible();

    if(duplex){
      loop = Math.ceil(loop);
      duplex = true;
    }

    var aptNumber;
    var type;
    var area;
    var cocheras;
    var object

    //ventas
    let precioMq = this.ventasDolaresMq;
    let precioPorCochera = this.ventasCocherasDolaressMq * this.areaCochera;
    let precioDpto;
    let precioCochera;
    let precioDptoSinCochera;

    var i;
    for (i = 1; i < loop; i++) {
      aptNumber =  "20" + i;

      if((i + 1) === loop){
        if(duplex){

          area = this.getAreaRestante();
          precioDpto = area * precioMq;
        } else {
          area = areaVendible / dptos;
          precioDpto = area * precioMq;
        }
      }else {
        area = areaVendible / dptos;
        precioDpto = area * precioMq;
      }

      type = this.getApartmentType(area);
      cocheras = this.getCocherasPorDpto(area);

      //ventas
      precioCochera = cocheras * precioPorCochera;
      precioDptoSinCochera = precioDpto - precioPorCochera;

      if(isVentasTable){
        object = {  ventasDptoCount: '',
                    ventasDptoNum: '',
                    ventasDptoTipo: type,
                    ventasAreaTechada: area,
                    ventasAreaLibre: '',
                    ventasAreaOcupada: area,
                    ventasPrecioDpto: precioDpto,
                    ventasPrecioCochera: precioCochera,
                    ventasPrecioDptoMq: precioMq,
                    ventasPrecioDptoSinCochera: precioDptoSinCochera};
      } else {
        object = {  tipicoAptNumber: aptNumber,
                    tipicoAptType: type,
                    tipicoAptArea: area,
                    tipicoAptCocheras: cocheras};
      }

      aptRows.push(object);
    }

    return aptRows;

  }

  getTotalPisoTable(){
    let pisoTotal = [];

    let object = {  tipicoAptPorPiso: this.getDptosPorPiso(),
                tipicoPisoAreaTechada: this.getAreaTechada(),
                tipicoPisoAreaComunTotal: this.getAreaComun(),
                tipicoPisoAreaVendible: this.getAreaVendible() };

    pisoTotal.push(object);
    return pisoTotal;
  }


  getDepartamentosTerrazaTable(isVentasTable) {
    let rows = [];
    let tipicoRow = this.getDepartamentosTable();
    let terrazaRow = [];
    let totalRow = [];

    let aptNumber;
    let type;
    let areaTechada;
    let terAreaTechada;
    let aptAreaLibre;
    let cocheras;
    let object;
    let areaOcupada;

    //ventas
    let precioMq = this.ventasDolaresMq;
    let precioPorCochera = this.ventasCocherasDolaressMq * this.areaCochera;
    let precioDpto;
    let precioCochera;
    let precioDptoSinCochera;

    var i;
    for (i = 0; i < tipicoRow.length; i++) {
      //first floor: piso tipico
      aptNumber = '';
      type = 'Nivel 1';
      areaTechada = tipicoRow[i].tipicoAptArea;
      aptAreaLibre = '';
      cocheras = '';

      object = {  terrazaAptNumber: aptNumber,
                  terrazaAptType: type,
                  terrazaAptAreaTechada: areaTechada,
                  terrazaAptAreaLibre: aptAreaLibre,
                  terrazaAptCocheras: cocheras
      }
      if(!isVentasTable)
        rows.push(object);

      //second floor: terraza
      aptNumber = '';
      type = 'Nivel 2';
      terAreaTechada = this.getTerrazaAreaVendibleDpto(areaTechada);
      aptAreaLibre = this.getTerrazaAreaLibreDpto(areaTechada);
      cocheras = '';

      object = {  terrazaAptNumber: aptNumber,
                  terrazaAptType: type,
                  terrazaAptAreaTechada: terAreaTechada,
                  terrazaAptAreaLibre: aptAreaLibre,
                  terrazaAptCocheras: cocheras
                }
      if(!isVentasTable)
        rows.push(object);

      //Total row
      aptNumber = this.altura + '0' + (i+1);
      type = 'Duplex'; //could be a triplex
      areaTechada = terAreaTechada + areaTechada;
      cocheras = tipicoRow[i].tipicoAptCocheras;
      areaOcupada = areaTechada + aptAreaLibre;

      //ventas
      precioDpto = (areaTechada * precioMq) + (aptAreaLibre *(this.ventasCoeffAreaLibre/100));
      precioCochera = cocheras * precioPorCochera;
      precioDptoSinCochera = precioDpto - precioPorCochera;

      if(isVentasTable){
        object = { ventasDptoCount: '',
                   ventasDptoNum: '',
                   ventasDptoTipo: type,
                   ventasAreaTechada: areaTechada,
                   ventasAreaLibre: aptAreaLibre,
                   ventasAreaOcupada: areaOcupada,
                   ventasPrecioDpto: precioDpto,
                   ventasPrecioCochera: precioCochera,
                   ventasPrecioDptoMq: precioMq,
                   ventasPrecioDptoSinCochera: precioDptoSinCochera};
      } else {
        object = { terrazaAptNumber: aptNumber,
                   terrazaAptType: type,
                   terrazaAptAreaTechada: areaTechada,
                   terrazaAptAreaLibre: aptAreaLibre,
                   terrazaAptCocheras: cocheras};
      }


      rows.push(object);
    }
    return rows;
  }

  getTotalPisoTerTable(){
    let pisoTotal = [];
    let areaTechadaTer = this.getAreaTechada() + this.getTerrazaAreaVendibleTotal();
    let areaVendibleTer = this.getAreaVendible() + this.getTerrazaAreaVendibleTotal();
    let areaLibreTer = this.getTerrazaAreaLibreTotal();

    let object = {  terrazaAptPorPiso: this.getDptosPorPiso(),
                terrazaPisoAreaTechada: areaTechadaTer,
                terrazaPisoAreaComunTotal: this.getAreaComun(),
                terrazaPisoAreaLibre: areaLibreTer,
                terrazaPisoAreaVendible: areaVendibleTer };

    pisoTotal.push(object);
    return pisoTotal;
  }

  getTotalOfTotals(totalPrimerArr, totalTipicoArr, totalUltimoArr, cocheras){
    let totalPrimer = totalPrimerArr[0];
    let totalTipico = totalTipicoArr[0];
    let totalUltimo = totalUltimoArr[0];
    let total = [];
    let pisos;
    let dptosTotal;
    let areaTechada;
    let areaComun;
    let areaLibre;
    let areaVendible;
    let cocherasTotal;

    //subtract primer piso
    let pisosTipico = this.altura - 1;
    if(this.isLastFloorDifferent() || this.terrazaOption)
      pisosTipico = pisosTipico - 1;
    dptosTotal = totalPrimer.primerAptPorPiso + (totalTipico.tipicoAptPorPiso * pisosTipico);
    areaTechada = totalPrimer.primerPisoAreaTechada + (totalTipico.tipicoPisoAreaTechada * pisosTipico);
    areaComun = totalPrimer.primerPisoAreaComunTotal + (totalTipico.tipicoPisoAreaComunTotal * pisosTipico);
    areaVendible = totalPrimer.primerPisoAreaVendible + (totalTipico.tipicoPisoAreaVendible * pisosTipico);

    if(this.terrazaOption){
      dptosTotal = dptosTotal + totalUltimo.terrazaAptPorPiso;
      areaTechada = areaTechada + totalUltimo.terrazaPisoAreaTechada;
      areaComun = areaComun + totalUltimo.terrazaPisoAreaComunTotal;
      areaLibre = totalUltimo.terrazaPisoAreaLibre;
      areaVendible = areaVendible + totalUltimo.terrazaPisoAreaVendible;
    }
    pisos = this.altura;
    cocherasTotal = cocheras.getCocherasTotal();

    let object = {  totalPisos: pisos,
                totalApts: dptosTotal,
                totalAreaTechada: areaTechada,
                totalAreaComun: areaComun,
                totalAreaLibre: areaLibre,
                totalAreaVendible: areaVendible,
                totalcocheras: cocherasTotal };

    total.push(object);
    return total;
  }
  // tipicoAptPorPiso: ,
  // tipicoPisoAreaTechada: ,
  // tipicoPisoAreaComunTotal: ,
  // tipicoPisoAreaVendible:


  //even number of floors -- all can have duplexAre
  //even number of floors with terraza -- all have duplex top is triplex
  //odd number of floors-- all duplex except top floor divided area
  //odd number of floors with terraza -- all duplex

  //check primer piso and piso tipico-- can have duplex
  //check tipico with tipico
  //check triplex

  // if(floorPri + floorTip = duplex){
  //   if no - pisos - 1
  // }
  // if(floorTip + floorTip = duplex){
  //   if yes and pisos odd then break up the last floor-- unless last floor has
  //   terraza-- check if large enough.. then duplex -- if no break up the floors
  //   if yes and pisos even and terraza turn to triplex
  // }



}

module.exports = TipicoPisoResults;
