"use strict";

class CocherasResults{

  constructor(proyectoinputs, primerPisoResults, tipicoPisoResults){
    this.cochVisitas = proyectoinputs.cabida.cabCocheras.cochVisitas;
    this.cochPorDpto = proyectoinputs.cabida.cabCocheras.cochPorDpto;
    this.areaTechaSotano = proyectoinputs.cabida.cabCocheras.areaTechaSotano;
    this.minAreaTechaSotano = proyectoinputs.cabida.cabCocheras.minAreaTechaSotano;
    this.areaCochera = proyectoinputs.cabida.cabCocheras.areaCochera;
    this.cocherasPorDormsOption = proyectoinputs.cabida.cabCocheras.cocherasPorDormsOption;
    this.pisos = proyectoinputs.cabida.cabConstruccion.altura;
    this.areaTerreno = proyectoinputs.cabida.cabConstruccion.areaTerreno;
    this.primerPisoResults = primerPisoResults;
    this.tipicoPisoResults = tipicoPisoResults;
  }

  getCocherasResidentes(){
    var totalCocheras = this.primerPisoResults.getCantidadCocherasPorPiso();
    totalCocheras = totalCocheras + (this.tipicoPisoResults.getCantidadCocherasPorPiso() * (this.pisos - 1));
    //if duplex removed from uneven top floor
    if(this.tipicoPisoResults.isLastFloorDifferent())
      totalCocheras = totalCocheras -1;

    return totalCocheras;
  }

  getCocherasVisitas(){
    return Math.ceil(this.getCocherasResidentes() * (this.cochVisitas/100));
  }

  getCocherasTotal(){
    return this.getCocherasResidentes() + this.getCocherasVisitas();
  }

  getCocherasResidentesArea(){
    return this.getCocherasResidentes() * this.areaCochera;
  }

  getCocherasVisitasArea(){
    return this.getCocherasVisitas() * this.areaCochera;
  }

  getCocherasTotalArea(){
    return (this.getCocherasResidentes() + this.getCocherasVisitas()) * this.areaCochera;
  }

  getSotanoRequeridos(){
    var sotanosEnteros = Math.floor(this.getCocherasTotalArea() / this.areaTerreno);
    if(sotanosEnteros===0){
      if(this.getCocherasTotalArea() > (this.areaTerreno * 0.5))
        return 1;
      else
        return 0.5
    }else{
      if(this.agregarMedioSotano())
        return sotanosEnteros + this.getSotanosMedio();
      else
        return sotanosEnteros;
    }

    return sotanos;
  }

  agregarMedioSotano(){
    var medioSotano = this.getCocherasTotalArea() % this.areaTerreno;
    if(medioSotano >= (this.areaTerreno * 0.3))
      return true;
    else
      return false;
  }

  getSotanosMedio(){
    var medioSotano = this.getCocherasTotalArea() % this.areaTerreno;
    if(medioSotano <= (this.areaTerreno * 0.5))
      return 0.5;
    else
      return 1;
  }

  getTotalSotanoArea(){
    return this.getSotanoRequeridos() * this.areaTerreno;
  }

  getCocherasAdicionales(){
    var areaRestante = (this.getSotanoRequeridos()* this.areaTerreno) - this.getCocherasTotalArea();
    return Math.floor(areaRestante / this.areaCochera);
  }

  getCocherasParaLaVenta(){
    return this.getCocherasAdicionales() + this.getCocherasTotal() - this.getCocherasVisitas();
  }

  getCocherasTable(){
    let rows = [];
    let row;
    let titulo;
    let cantidad;
    let area;
    // columns: titulo, cantidad, area
    //cocheras = ['cocherasTitulo', 'cocherasCantidad', 'cocherasArea'];
    titulo = 'Cocheras Residentes';
    cantidad = this.getCocherasResidentes();
    area = this.getCocherasResidentesArea();

    row = {cocherasTitulo: titulo,
          cocherasCantidad: cantidad,
          cocherasArea: area};
    rows.push(row);

    titulo = 'Cocheras Visitas';
    cantidad = this.getCocherasVisitas();
    area = this.getCocherasVisitasArea();
    row = {cocherasTitulo: titulo,
          cocherasCantidad: cantidad,
          cocherasArea: area};
    rows.push(row);

    titulo = 'sub-Total';
    cantidad = this.getCocherasVisitas() + this.getCocherasResidentes();
    area = this.getCocherasVisitasArea() + this.getCocherasResidentesArea();
    row = {cocherasTitulo: titulo,
          cocherasCantidad: cantidad,
          cocherasArea: area};
    rows.push(row);

    titulo = '';
    cantidad = '';
    area = '';
    row = {cocherasTitulo: titulo,
          cocherasCantidad: cantidad,
          cocherasArea: area};
    rows.push(row);

    titulo = 'Cocheras Adicionales';
    cantidad = this.getCocherasAdicionales();
    area = this.areaCochera * this.getCocherasAdicionales();
    row = {cocherasTitulo: titulo,
          cocherasCantidad: cantidad,
          cocherasArea: area};
    rows.push(row);

    titulo = 'Cocheras Para la Venta';
    cantidad = this.getCocherasParaLaVenta();
    area = this.getCocherasParaLaVenta() * this.areaCochera;
    row = {cocherasTitulo: titulo,
          cocherasCantidad: cantidad,
          cocherasArea: area};
    rows.push(row);

    return rows;
  }

  getSotanosTable(){

    let rows = [];
    let row;
    let titulo;
    let cantidad;
    let area;

    titulo = 'Capacidad de un Sotano';
    cantidad = this.areaTerreno / this.areaCochera;
    area = this.areaTerreno ;
    row = {cocherasTitulo: titulo,
          cocherasCantidad: cantidad,
          cocherasArea: area};
    rows.push(row);

    titulo = 'Sotanos requeridos';
    cantidad = this.getSotanoRequeridos();
    area = this.areaTerreno * this.getSotanoRequeridos();
    row = {cocherasTitulo: titulo,
          cocherasCantidad: cantidad,
          cocherasArea: area};
    rows.push(row);

    return rows;
  }
}

module.exports = CocherasResults;
