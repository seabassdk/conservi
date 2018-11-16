"use strict";

class FinanciamientoResults {

  constructor(proyectoinputs, costos){
    this.costoTerreno = proyectoinputs.proyectoGen.precio;

    this.finTerrenoTasaAnual = proyectoinputs.financiamiento.finTerrenoTasaAnual;
    this.finTerrenoPeriodoDesembolso = proyectoinputs.financiamiento.finTerrenoPeriodoDesembolso;
    this.finTerrenoPeriodoAmortizacion = proyectoinputs.financiamiento.finTerrenoPeriodoAmortizacion;
    this.finPromotorTasaAnual = proyectoinputs.financiamiento.finPromotorTasaAnual;
    this.finPromotorPeriodoDesembolso = proyectoinputs.financiamiento.finPromotorPeriodoDesembolso;
    this.finPromotorPeriodoAmortizacion = proyectoinputs.financiamiento.finPromotorPeriodoAmortizacion;
    this.coefFinTerrenoAportePropio = proyectoinputs.financiamiento.coefFinTerrenoAportePropio;
    this.coefFinPromotorAportePropio = proyectoinputs.financiamiento.coefFinPromotorAportePropio;

    this.costosDirectos = costos.getCostosDirecto();
  }

  getInterestAmountTerreno(){

    let aporteBancoTerreno = this.costoTerreno - (this.costoTerreno * (this.coefFinTerrenoAportePropio/100));
    let monthlyRate = (this.finTerrenoTasaAnual/12)/100;

    let sumInterest = 0;

    var i;
    for(i = 0; i < this.finTerrenoPeriodoDesembolso; i++){
        sumInterest = sumInterest + (aporteBancoTerreno * monthlyRate);
    }

    let amortizacion = aporteBancoTerreno / this.finTerrenoPeriodoAmortizacion;
    let saldo = aporteBancoTerreno;
    for(i=0; i < this.finTerrenoPeriodoAmortizacion; i++){
        saldo = saldo - amortizacion;
        sumInterest = sumInterest + (saldo * monthlyRate);
    }

    return sumInterest;

  }

  getInterestAmountPromotor(){

    let aporteBancoPromotor = this.costosDirectos - (this.costosDirectos * (this.coefFinPromotorAportePropio/100));

    let monthlyRate = (this.finPromotorTasaAnual/12)/100;

    let sumInterest = 0;

    let desembolso = aporteBancoPromotor / this.finPromotorPeriodoDesembolso;
    let acumulado =  0;
    var i;
    for(i=0; i <this.finPromotorPeriodoDesembolso; i++){
      acumulado = acumulado + desembolso;
      sumInterest = sumInterest + (acumulado * monthlyRate);
    }

    let amortizacion = aporteBancoPromotor / this.finPromotorPeriodoAmortizacion;
    for(i=0; i < this.finPromotorPeriodoAmortizacion; i++){
      acumulado = acumulado - amortizacion;
      sumInterest = sumInterest + (acumulado * monthlyRate);
    }

    return sumInterest;
  }
}

module.exports = FinanciamientoResults;
