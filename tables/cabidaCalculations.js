"use strict";

class CabidaCalculations {

  static calculateSomething(){
    let result = 'calculated something';

    return result;
  }
  //area areaTechada
  static getAreaTechada(areaTerreno, cofAreaConstruible){
    return areaTerreno * (cofAreaConstruible / 100);
  }

  //area comun
  static getAreaComunPrimerPiso(tipico, primerPisoSelection, areaTechada,areaComunCoef, areaAbs, areaRel){

    //tipico
    if(tipico || primerPisoSelection===1){
      return areaTechada * (areaComunCoef/100);
    //area absoluta
    }else if (primerPisoSelection===2) {
      return areaAbs;
    //area relativa
    }else {
      return areaTechada * (areaRel/100);
    }
  }

  //area vendible
  static getAreaVendible(areaTechada,areaComunPrimerPiso){
    return areaTechada - areaComunPrimerPiso;
  }

  //The following functions assume that maximum area apartments are preferred

  //dptos por piso
  static getDptosPorPiso(areaVendible, dptoAreaMax){
    return Math.floor(areaVendible/dptoAreaMax);
  }

  //area restante
  static getAreaRestante(areaVendible, dptoAreaMax){
    return areaVendible % dptoAreaMax;
  }

  static getTerrazaAreaVendible(areaVendibleTipico, coefAreaTechadaTerraza){
    return areaVendibleTipico * (coefAreaTechadaTerraza/100);
  }

  static getTerrazaAreaLibre(areaVendibleTipico, coefAreaLibreTerraza){
    return areaVendibleTipico * (coefAreaLibreTerraza/100);
  }

  static extraDpto(areaRestante, dptoMin){
    if(areaRestante >= dptoMin)
      return true;
    else
      return false
  }

  //in the case of terraza check option on whether to add triplex
  static extraDuplex(dptoMin, areaRestanteUno, areaDosRestanteDos){
    let duplexArea = areaUnoRestante + areaDosRestante;

    if(duplexArea >= dptoMin)
      return true;
    else
      return false;
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

module.exports = CabidaCalculations;

// Private Sub calculateAreaRestante()
//
//     'Extra Depa
//     Range(agregarDptoPri).Value = extraDpto(Range(areaVendibleRestantePri).Value)
//     Range(agregarDptoTip).Value = extraDpto(Range(areaVendibleRestanteTip).Value)
//
//     'Duplex
//     If Range(agregarDptoPri).Value = "No" Then
//         Range(agregarDuplexPri).Value = extraDuplex(Range(areaVendibleRestantePri).Value, Range(areaVendibleRestanteTip).Value)
//     Else
//         Range(agregarDuplexPri).Value = "No"
//     End If
//
//     If Range(agregarDptoTip).Value = "No" Then
//         Range(agregarDuplexTip).Value = extraDuplex(Range(areaVendibleRestanteTip).Value, Range(areaVendibleRestanteTip).Value)
//     Else
//         Range(agregarDuplexTip).Value = "No"
//     End If
//
//     'Distribuir area restante
//     If Range(agregarDptoPri).Value = "Si" Or Range(agregarDuplexPri).Value = "Si" Then
//         Range(distribuirAreaPri).Value = "No"
//     Else
//         Range(distribuirAreaPri).Value = "Si"
//     End If
//
//     If Range(agregarDptoTip).Value = "Si" Or Range(agregarDuplexTip).Value = "Si" Then
//         Range(distribuirAreaTip).Value = "No"
//     Else
//         Range(distribuirAreaTip).Value = "Si"
//     End If
// End Sub
