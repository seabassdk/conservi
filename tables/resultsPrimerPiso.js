"use strict";

class PrimerPisoResults {

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
        this.cochPorDpto = proyectoinputs.cabida.cabCocheras.cochPorDpto;
        this.areaCochera = proyectoinputs.cabida.cabCocheras.areaCochera;
        this.areaComunAbs = proyectoinputs.cabida.cabPrimerPisoAreaComun.areaComunAbs;
        this.areaComunRel = proyectoinputs.cabida.cabPrimerPisoAreaComun.areaComunRel;
        this.primerPisoSelection = proyectoinputs.cabida.cabPrimerPisoAreaComun.primerPisoSelection;
        this.terrazaAreaLibre = proyectoinputs.cabida.cabTerraza.terrazaAreaLibre;
        this.terrazaAreaTechada = proyectoinputs.cabida.cabTerraza.terrazaAreaTechada;
        this.terrazaOption = proyectoinputs.cabida.cabTerraza.terrazaOption;

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
  getAreaComunPrimerPiso(){
    let primerPisoSelection = this.primerPisoSelection;

    //tipico
    if(primerPisoSelection===1){
      return this.getAreaTechada() * (this.coefAreaComun /100);
    //area absoluta
    }else if (primerPisoSelection===2) {
      return this.areaComunAbs;
    //area relativa
    }else {
      return this.getAreaTechada() * (this.areaComunRel/100);
    }
  }

  //area vendible
  getAreaVendible(){
    return this.getAreaTechada() - this.getAreaComunPrimerPiso();
  }

  getAreaVendibleTipico(){
    return this.getAreaTechada() - (this.getAreaTechada() * (this.coefAreaComun /100));
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
      if(this.altura > 3){
        if((this.getAreaVendibleTipico() % this.areaMax) * 2 > this.areaMin || (this.getAreaVendibleTipico() % this.areaMax) > this.areaMin ){
          let duplexArea = this.getAreaRestante() + (this.getAreaVendibleTipico() % this.areaMax);
          if(duplexArea >= this.areaMin)
            return true;
        }
      }
    }
    return false;
  }

  distribuirAreaRestante(){
    if(this.getAreaRestante() > 0 && this.duplex() ===false && this.extraDpto() === false){
      return true;
    }
    return false;

  }

  getCantidadCocherasPorPiso(){
    //cocheras por dormitorio
    if(this.cocherasPorDormsOption === true){
      if(this.distribuirAreaRestante()){
        return Math.floor(this.getAreaVendible()/this.areaMax) * this.dormsAreaMax;
      }else if (this.extraDpto()){
        if(this.getAreaRestante() >= this.areaMin && this.getAreaRestante()< this.areaMid){
          return (Math.floor(this.getAreaVendible()/this.areaMax) * this.dormsAreaMax) + this.dormsAreaMin;
        }
        else
          return (Math.floor(this.getAreaVendible()/this.areaMax) * this.dormsAreaMax) + this.dormsAreaMid;
      }else{
        let duplexArea = this.getAreaRestante() + (this.getAreaVendibleTipico() % this.areaMax);
        if(duplexArea >= this.areaMin && duplexArea< this.areaMid){
          return ((Math.floor(getAreaVendible()/this.areaMax) * this.dormsAreaMax) + this.dormsAreaMin) / 2;
        }else{
          return ((Math.floor(this.getAreaVendible()/this.areaMax) * this.dormsAreaMax) + this.dormsAreaMid) / 2;
        }
      }
    }else{
      if(this.extraDpto()){
        return ((Math.floor(this.getAreaVendible()/this.areaMax)) + 1) * this.cochPorDpto ;
      }
      if(this.duplex()){
        return ((Math.floor(this.getAreaVendible()/this.areaMax)) + 0.5) * this.cochPorDpto ;
      }

      return Math.floor(this.getAreaVendible()/this.areaMax) * this.cochPorDpto ;
    }
  }


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
    if(isVentasTable === undefined)
      isVentasTable = false;

    var aptRows = [];


    var dptos = this.getDptosPorPiso();
    var loop = dptos + 1;
    var duplex = this.duplex();
    var areaVendible = this.getAreaVendible();


    if(duplex){
      loop = Math.ceil(loop);
      duplex = true;
    }

    //cabida
    var aptNumber;
    var type;
    var area;
    var cocheras;
    var object

    //ventas
    var precioMq = this.ventasDolaresMq;
    var precioPorCochera = this.ventasCocherasDolaressMq * this.areaCochera;
    var precioDpto;
    var precioCochera;
    var precioDptoSinCochera;


    var i;
    for (i = 1; i < loop; i++) {
      aptNumber =  "10" + i;

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
      precioCochera = cocheras * precioPorCochera;
      precioDptoSinCochera = precioDpto - precioPorCochera;

      // 'ventasDptoCount'
      if(isVentasTable){
        object = { ventasDptoCount: '',
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
        object = { primerAptNumber: aptNumber,
                   primerAptType: type,
                   primerAptArea: area,
                   primerAptCocheras: cocheras};
      }

      aptRows.push(object);
    }

    return aptRows;

  }

  getTotalPisoTable(){
    let pisoTotal = [];

    let object = {  primerAptPorPiso: this.getDptosPorPiso(),
                primerPisoAreaTechada: this.getAreaTechada(),
                primerPisoAreaComunTotal: this.getAreaComunPrimerPiso(),
                primerPisoAreaVendible: this.getAreaVendible() };

    pisoTotal.push(object);
    return pisoTotal;
  }
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

module.exports = PrimerPisoResults;
