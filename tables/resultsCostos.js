"use strict";

class CostosResults {

  constructor(proyectoinputs, primerPisoResults, tipicoPisoResults, ventas, cocheras){

    /*
      COSTOS DIRECTOS
    */
    this.costoConstruccionSotano = proyectoinputs.corrida.costosDirectos.costoConstruccionSotano;
    this.costoConstruccionDptos = proyectoinputs.corrida.costosDirectos.costoConstruccionDptos;
    this.costoConstruccionAreaComun = proyectoinputs.corrida.costosDirectos.costoConstruccionAreaComun;
    this.sistemaContraincendio = proyectoinputs.corrida.costosDirectos.sistemaContraincendio;
    this.extraccionMonoxido = proyectoinputs.corrida.costosDirectos.extraccionMonoxido;
    this.ascensor = proyectoinputs.corrida.costosDirectos.ascensor;
    this.ascensorCantidad = proyectoinputs.corrida.costosDirectos.ascensorCantidad;
    this.bombasElectricas = proyectoinputs.corrida.costosDirectos.bombasElectricas;
    this.bombasElectricasCantidad = proyectoinputs.corrida.costosDirectos.bombasElectricasCantidad;

    this.costosDirectosPlus = proyectoinputs.corrida.costosDirectos.costosDirectosPlus;

    this.totals = tipicoPisoResults.getTotalOfTotals(primerPisoResults.getTotalPisoTable(),tipicoPisoResults.getTotalPisoTable(),tipicoPisoResults.getTotalPisoTerTable(), cocheras);


    // this.primerPisoResults = primerPisoResults;
    // this.tipicoPisoResults = tipicoPisoResults;

    this.cocherasTotalArea = cocheras.getTotalSotanoArea();
    this.areaDptosTotal = this.totals[0].totalAreaVendible;
    this.areaComunTotal = this.totals[0].totalAreaComun;
    this.areaTechadaTotal = this.totals[0].totalAreaTechada;

    /*
    ********************************************************************

      COSTOS INDIRECTOS
    */
    this.proyectoIndirecto = proyectoinputs.corrida.costosIndirectos.proyectoIndirecto;
    this.licenciaConformidadObra = proyectoinputs.corrida.costosIndirectos.licenciaConformidadObra;
    this.autoavaluoPropiedadMayor = proyectoinputs.corrida.costosIndirectos.autoavaluoPropiedadMayor;
    this.abogadoRegistros = proyectoinputs.corrida.costosIndirectos.abogadoRegistros;
    this.notariaRegistrosDeptos = proyectoinputs.corrida.costosIndirectos.notariaRegistrosDeptos;
    this.notariaRegistrosTerreno = proyectoinputs.corrida.costosIndirectos.notariaRegistrosTerreno;
    this.alcabala = proyectoinputs.corrida.costosIndirectos.alcabala;
    this.demolicion = proyectoinputs.corrida.costosIndirectos.demolicion;
    this.serpar = proyectoinputs.corrida.costosIndirectos.serpar;
    this.costosIndirectosPlus = proyectoinputs.corrida.costosIndirectos.costosIndirectosPlus;


    //costoTerreno
    this.costoTerreno =proyectoinputs.proyectoGen.precio;
    //total Cocheras
    this.totalCocheras =cocheras.getCocherasParaLaVenta();
    //total deptos
    this.totalDptos = this.totals[0].totalApts;
    //area terreno
    this.areaTerreno = proyectoinputs.proyectoGen.area
    //ventas
    this.ventasDptos = ventas.getTotalVentas().ventasPrecioDptoSinCochera;

    this.ventasCocheras = ventas.getTotalVentas().ventasPrecioCochera;


  }

  getCostosIndirectosTable(){
    // ['indirectosTitulo', 'medida', 'cantidad', 'cu', 'totalDolares', 'totalSoles']
    let areaTechadaTotal = this.cocherasTotalArea + this.areaDptosTotal + this.areaComunTotal;
    let totalCocherasDptos = this.totalCocheras + this.totalDptos;
    let rows = [];
    let total = 0;
    let indirectoRow = {
      indirectosTitulo: 'Proyecto',
      medida: 'm²',
      cantidad: Math.round(areaTechadaTotal) + ' m²',
      cu: '$ ' + this.proyectoIndirecto,
      totalDolares: this.proyectoIndirecto * areaTechadaTotal
    }
    rows.push(indirectoRow);
    total = total + (this.proyectoIndirecto * areaTechadaTotal);

    let costoDolarTotal = (this.costoConstruccionSotano * this.cocherasTotalArea) +
                          (this.costoConstruccionDptos * this.areaDptosTotal) +
                          (this.costoConstruccionAreaComun * this.areaComunTotal);
    indirectoRow = {
      indirectosTitulo: 'Licencia- conformidad obra-DF',
      medida: '%',
      cantidad: '$ ' + Math.round(costoDolarTotal),
      cu: this.licenciaConformidadObra + '%',
      totalDolares: (this.licenciaConformidadObra/100) * costoDolarTotal
    }
    rows.push(indirectoRow);
    total = total + ((this.licenciaConformidadObra/100) * costoDolarTotal);

    indirectoRow = {
      indirectosTitulo: 'Autoavaluo propieda-mayor valor',
      medida: 'unidad',
      cantidad: totalCocherasDptos,
      cu: '$ ' + this.autoavaluoPropiedadMayor ,
      totalDolares: this.autoavaluoPropiedadMayor  * totalCocherasDptos
    }
    rows.push(indirectoRow);
    total = total + (this.autoavaluoPropiedadMayor  * totalCocherasDptos);

    indirectoRow = {
      indirectosTitulo: 'Gastos abogado Reg. Inter+inde',
      medida: 'unidad',
      cantidad: totalCocherasDptos,
      cu: '$ ' + this.abogadoRegistros,
      totalDolares: this.abogadoRegistros  * totalCocherasDptos
    }
    rows.push(indirectoRow);
    total = total + (this.abogadoRegistros  * totalCocherasDptos);

    indirectoRow = {
      indirectosTitulo: 'Gastos Not. Y Regist -Dptos',
      medida: 'unidad',
      cantidad: totalCocherasDptos,
      cu: '$ ' + this.notariaRegistrosDeptos,
      totalDolares: this.notariaRegistrosDeptos  * totalCocherasDptos
    }
    rows.push(indirectoRow);
    total = total + (this.notariaRegistrosDeptos  * totalCocherasDptos);

    indirectoRow = {
      indirectosTitulo: 'Gastos Not. Regist. -terreno',
      medida: 'unidad',
      cantidad: '1',
      cu: '$ ' + this.notariaRegistrosTerreno,
      totalDolares: this.notariaRegistrosTerreno
    }
    rows.push(indirectoRow);
    total = total + (this.notariaRegistrosTerreno);

    indirectoRow = {
      indirectosTitulo: 'Alcabala',
      medida: '%',
      cantidad: '$ ' + Math.round(this.costoTerreno),
      cu: this.alcabala + '%',
      totalDolares: (this.alcabala/100)  * this.costoTerreno
    }
    rows.push(indirectoRow);
    total = total + ((this.alcabala/100)  * this.costoTerreno);

    indirectoRow = {
      indirectosTitulo: 'Demolicion',
      medida: 'm²',
      cantidad: '',
      cu: '$ ' + this.demolicion ,
      totalDolares: this.demolicion
    }
    rows.push(indirectoRow);
    total = total + this.demolicion;

    var i;
    for(i = 0; i < this.costosIndirectosPlus.length; i++){
      indirectoRow = {
        indirectosTitulo: this.costosIndirectosPlus[i].nombre,
        medida: '',
        cantidad: '',
        cu: '',
        totalDolares: this.costosIndirectosPlus[i].costo
      }
      rows.push(indirectoRow);
      total= total  + this.costosIndirectosPlus[i].costo;
    }

    indirectoRow = {
      indirectosTitulo: 'TOTAL:',
      medida: '',
      cantidad: '',
      cu: '',
      totalDolares: total
    }
    rows.push(indirectoRow);

    return rows;

  }

  getCostosDirectosTable(){
    // 'directosTitulo','proporciones', 'metrosCuadrado', 'dolarPorMq', 'costoDolar'];
    let areaTechadaTotal = this.cocherasTotalArea + this.areaDptosTotal + this.areaComunTotal;
    let rowDirecto;
    let rows = [];
    rowDirecto = {
      directosTitulo: 'Cocheras sotano',
      proporciones: this.cocherasTotalArea/areaTechadaTotal,
      metrosCuadrado: this.cocherasTotalArea,
      dolarPorMq: this.costoConstruccionSotano,
      costoDolar: this.costoConstruccionSotano * this.cocherasTotalArea
    };
    rows.push(rowDirecto);

    rowDirecto = {
      directosTitulo: 'Area Dptos',
      proporciones: this.areaDptosTotal/areaTechadaTotal,
      metrosCuadrado: this.areaDptosTotal,
      dolarPorMq: this.costoConstruccionDptos,
      costoDolar: this.costoConstruccionDptos * this.areaDptosTotal
    };
    rows.push(rowDirecto);

    rowDirecto = {
      directosTitulo: 'Area comun techada',
      proporciones: this.areaComunTotal/areaTechadaTotal,
      metrosCuadrado: this.areaComunTotal,
      dolarPorMq: this.costoConstruccionAreaComun,
      costoDolar: this.costoConstruccionAreaComun * this.areaComunTotal
    };
    rows.push(rowDirecto);

    let costoDolarTotal = (this.costoConstruccionSotano * this.cocherasTotalArea) +
                          (this.costoConstruccionDptos * this.areaDptosTotal) +
                          (this.costoConstruccionAreaComun * this.areaComunTotal);
    rowDirecto = {
      directosTitulo: 'COSTO DIRECTO',
      proporciones: areaTechadaTotal/areaTechadaTotal,
      metrosCuadrado: areaTechadaTotal,
      dolarPorMq: costoDolarTotal/areaTechadaTotal,
      costoDolar: costoDolarTotal
    };
    rows.push(rowDirecto);

    let subTotal = 0;
    rowDirecto = {
      directosTitulo: 'Sistema contraincendio',
      proporciones: '',
      metrosCuadrado: areaTechadaTotal,
      dolarPorMq: this.sistemaContraincendio,
      costoDolar: this.sistemaContraincendio * areaTechadaTotal
    };
    rows.push(rowDirecto);
    subTotal = subTotal + (this.sistemaContraincendio * areaTechadaTotal);

    rowDirecto = {
      directosTitulo: 'Extraccion de monoxido',
      proporciones: '',
      metrosCuadrado: this.cocherasTotalArea,
      dolarPorMq: this.extraccionMonoxido,
      costoDolar: this.cocherasTotalArea * this.extraccionMonoxido
    };
    rows.push(rowDirecto);
    subTotal = subTotal + (this.cocherasTotalArea  * this.extraccionMonoxido);

    rowDirecto = {
      directosTitulo: 'Ascensor',
      proporciones: '',
      metrosCuadrado: this.ascensorCantidad ,
      dolarPorMq: this.ascensor ,
      costoDolar: this.ascensorCantidad * this.ascensor
    };
    rows.push(rowDirecto);
    subTotal = subTotal + (this.ascensorCantidad * this.ascensor);

    rowDirecto = {
      directosTitulo: 'Bombas Electricas',
      proporciones: '',
      metrosCuadrado: this.bombasElectricasCantidad,
      dolarPorMq: this.bombasElectricas,
      costoDolar: this.bombasElectricasCantidad  * this.bombasElectricas
    };
    rows.push(rowDirecto);
    subTotal = subTotal + (this.bombasElectricasCantidad  * this.bombasElectricas);

    var i;
    for(i = 0; i < this.costosDirectosPlus.length; i++){
      rowDirecto = {
        directosTitulo: this.costosDirectosPlus[i].nombre,
        proporciones: '',
        metrosCuadrado: '',
        dolarPorMq: '',
        costoDolar: this.costosDirectosPlus[i].costo
      };
      rows.push(rowDirecto);
      subTotal = subTotal + this.costosDirectosPlus[i].costo;
    }

    rowDirecto = {
      directosTitulo: 'Sub-Total',
      proporciones: '',
      metrosCuadrado: '',
      dolarPorMq: subTotal/areaTechadaTotal,
      costoDolar: subTotal
    };
    rows.push(rowDirecto);

    rowDirecto = {
      directosTitulo: 'TOTAL C.D.C + EQUIPOS',
      proporciones: '',
      metrosCuadrado: '',
      dolarPorMq: (subTotal + costoDolarTotal)/areaTechadaTotal,
      costoDolar: subTotal + costoDolarTotal
    };
    rows.push(rowDirecto);

    let adminObraInclIGV = (subTotal + costoDolarTotal) * 0.12;
    rowDirecto = {
      directosTitulo: 'Administ. Obra Inc. Igv',
      proporciones: '0.12',
      metrosCuadrado: '',
      dolarPorMq: adminObraInclIGV / areaTechadaTotal,
      costoDolar: adminObraInclIGV
    };
    rows.push(rowDirecto);

    //this is what we need for the interest promotor
    let totalCostoIncluidoIGV = adminObraInclIGV + subTotal + costoDolarTotal;
    rowDirecto = {
      directosTitulo: 'Total Costo incluido IGV',
      proporciones: '',
      metrosCuadrado: '',
      dolarPorMq: totalCostoIncluidoIGV/areaTechadaTotal,
      costoDolar: totalCostoIncluidoIGV
    };
    rows.push(rowDirecto);

    let montoImponible = (adminObraInclIGV + subTotal + (costoDolarTotal * 0.6))/1.18;
    rowDirecto = {
      directosTitulo: 'Monto Imponible',
      proporciones: '',
      metrosCuadrado: '',
      dolarPorMq: '',
      costoDolar: montoImponible
    };
    rows.push(rowDirecto);

    rowDirecto = {
      directosTitulo: 'igv credito fiscal',
      proporciones: '0.18',
      metrosCuadrado: '',
      dolarPorMq: '',
      costoDolar: montoImponible * 0.18
    };
    rows.push(rowDirecto);

    rowDirecto = {
      directosTitulo: 'Total valor sin igv',
      proporciones: '',
      metrosCuadrado: '',
      dolarPorMq: '',
      costoDolar: totalCostoIncluidoIGV - (montoImponible * 0.18)
    };
    rows.push(rowDirecto);

    return rows;
  }


  getCostosDirecto(){
    // 'directosTitulo','proporciones', 'metrosCuadrado', 'dolarPorMq', 'costoDolar'];
    let areaTechadaTotal = this.cocherasTotalArea + this.areaDptosTotal + this.areaComunTotal;



    let costoDolarTotal = (this.costoConstruccionSotano * this.cocherasTotalArea) +
                          (this.costoConstruccionDptos * this.areaDptosTotal) +
                          (this.costoConstruccionAreaComun * this.areaComunTotal);


    let subTotal = 0;
    subTotal = subTotal + (this.sistemaContraincendio * areaTechadaTotal);
    subTotal = subTotal + (this.cocherasTotalArea  * this.extraccionMonoxido);
    subTotal = subTotal + (this.ascensorCantidad * this.ascensor);
    subTotal = subTotal + (this.bombasElectricasCantidad  * this.bombasElectricas);

    var i;
    for(i = 0; i < this.costosDirectosPlus.length; i++){
      subTotal = subTotal + this.costosDirectosPlus[i].costo;
    }

    let adminObraInclIGV = (subTotal + costoDolarTotal) * 0.12;

    //this is what we need for the interest promotor
    let totalCostoIncluidoIGV = adminObraInclIGV + subTotal + costoDolarTotal;

    return totalCostoIncluidoIGV;

  }

  getCostosIndirectos(){
    // ['indirectosTitulo', 'medida', 'cantidad', 'cu', 'totalDolares', 'totalSoles']
    let areaTechadaTotal = this.cocherasTotalArea + this.areaDptosTotal + this.areaComunTotal;
    let totalCocherasDptos = this.totalCocheras + this.totalDptos;

    let total = 0;
    total = total + (this.proyectoIndirecto * areaTechadaTotal);

    let costoDolarTotal = (this.costoConstruccionSotano * this.cocherasTotalArea) +
                          (this.costoConstruccionDptos * this.areaDptosTotal) +
                          (this.costoConstruccionAreaComun * this.areaComunTotal);
    total = total + ((this.licenciaConformidadObra/100) * costoDolarTotal);
    total = total + (this.autoavaluoPropiedadMayor  * totalCocherasDptos);
    total = total + (this.abogadoRegistros  * totalCocherasDptos);
    total = total + (this.notariaRegistrosDeptos  * totalCocherasDptos);
    total = total + (this.notariaRegistrosTerreno);
    total = total + ((this.alcabala/100)  * this.costoTerreno);

    total = total + this.demolicion;

    var i;
    for(i = 0; i < this.costosIndirectosPlus.length; i++){
      total= total  + this.costosIndirectosPlus[i].costo;
    }
    return total;
  }

  getCostosTotalesTable(interesTotalTerreno, interesTotalPromotor){
    var rows = [];

    var areaDptos = this.areaDptosTotal;
    var costoTerreno = this.costoTerreno;
    var costosDirectosTotal = this.getCostosDirecto();
    var costosIndirectosTotal = this.getCostosIndirectos();

    var ventasDptos = this.ventasDptos;
    var ventasCocheras = this.ventasCocheras;
    var ventasTotal = ventasDptos + ventasCocheras;
    var comisionVentas = ventasDptos * 0.04;

    var intereses = interesTotalTerreno + interesTotalPromotor;

    //calculate the igv
    var igvVentas = ((ventasTotal/2)/1.18)*0.18;
    var montoImponible = costosDirectosTotal / 1.18;
    var igvCreditoFiscal = montoImponible * 0.18;
    var igvAPagar = igvVentas - igvCreditoFiscal;

    console.log(' ventasTotal: ' + ventasTotal);
    console.log(' costosDirectosTotal: ' + costosDirectosTotal);
    console.log(' igvVentas: ' + igvVentas);
    console.log(' montoImponible: ' + montoImponible);
    console.log(' igvCreditoFiscal: ' + igvCreditoFiscal);
    console.log(' igvAPagar: ' + igvAPagar);

    //calculate I.R.
    var utilidadBruta = ventasTotal - costoTerreno - costosDirectosTotal;
    var utilidadOperativa = utilidadBruta - costosIndirectosTotal;
    var utilidadDespuesDeGGAA = utilidadOperativa - comisionVentas - igvAPagar;
    var utilidadDespuesDeGGFF = utilidadDespuesDeGGAA - intereses;
    var ir =  utilidadDespuesDeGGFF * 0.28;

    //table
    var subTotal = costoTerreno + costosDirectosTotal + costosIndirectosTotal + comisionVentas;
    var total = 0;
    // costosTotales = ['indirectosTitulo', 'proporciones', 'costoDolar', 'dolarPorMq' ]
    var rowTotales = {
      indirectosTitulo: 'Terreno',
      proporciones: costoTerreno/subTotal,
      costoDolar: costoTerreno,
      dolarPorMq: costoTerreno/areaDptos,
    }
    rows.push(rowTotales);
    total = total + costoTerreno;

    rowTotales = {
      indirectosTitulo: 'Costo Directo',
      proporciones: costosDirectosTotal/subTotal,
      costoDolar: costosDirectosTotal,
      dolarPorMq: costosDirectosTotal/areaDptos,
    }
    rows.push(rowTotales);
    total = total + costosDirectosTotal;

    rowTotales = {
      indirectosTitulo: 'Costo Indirecto',
      proporciones: costosIndirectosTotal/subTotal,
      costoDolar: costosIndirectosTotal,
      dolarPorMq: costosIndirectosTotal/areaDptos,
    }
    rows.push(rowTotales);
    total = total + costosIndirectosTotal;

    rowTotales = {
      indirectosTitulo: 'Publicidad y Promocion',
      proporciones: comisionVentas/subTotal,
      costoDolar: comisionVentas,
      dolarPorMq: comisionVentas/areaDptos,
    }
    rows.push(rowTotales);
    total = total + comisionVentas;

    rowTotales = {
      indirectosTitulo: 'Sub-Total',
      proporciones: subTotal/subTotal,
      costoDolar: subTotal,
      dolarPorMq: subTotal/areaDptos,
    }
    rows.push(rowTotales);
    rowTotales = {
      indirectosTitulo: 'Intereses',
      proporciones: '',
      costoDolar: intereses,
      dolarPorMq: intereses/areaDptos,
    }
    rows.push(rowTotales);
    total = total + (intereses);

    rowTotales = {
      indirectosTitulo: 'Igv',
      proporciones: '',
      costoDolar: igvAPagar,
      dolarPorMq: igvAPagar/areaDptos,
    }
    rows.push(rowTotales);
    total = total + (igvAPagar);

    rowTotales = {
      indirectosTitulo: 'I.R.',
      proporciones: '',
      costoDolar: ir,
      dolarPorMq: ir/areaDptos,
    }
    rows.push(rowTotales);
    total = total + (ir);

    rowTotales = {
      indirectosTitulo: 'TOTAL',
      proporciones: '',
      costoDolar: total,
      dolarPorMq: total/areaDptos,
    }
    rows.push(rowTotales);

    return rows;
  }

  getCostosTotale(interesTotalTerreno, interesTotalPromotor){

    var areaDptos = this.areaDptosTotal;
    var costoTerreno = this.costoTerreno;
    var costosDirectosTotal = this.getCostosDirecto();
    var costosIndirectosTotal = this.getCostosIndirectos();

    //Calculate Comision
    var ventasDptos = this.ventasDptos;
    var ventasCocheras = this.ventasCocheras;
    var ventasTotal = ventasDptos + ventasCocheras;
    var comisionVentas = ventasDptos * 0.04;

    //Calculate intereses
    var intereses = interesTotalTerreno + interesTotalPromotor;

    //calculate the igv
    var igvVentas = ((ventasTotal/2)/1.18)*0.18;
    var montoImponible = costosDirectosTotal / 1.18;
    var igvCreditoFiscal = montoImponible * 0.18;
    var igvAPagar = igvVentas - igvCreditoFiscal;

    //calculate I.R.
    var utilidadBruta = ventasTotal - costoTerreno - costosDirectosTotal;
    var utilidadOperativa = utilidadBruta - costosIndirectosTotal;
    var utilidadDespuesDeGGAA = utilidadOperativa - comisionVentas - igvAPagar;
    var utilidadDespuesDeGGFF = utilidadDespuesDeGGAA - intereses;
    var ir =  utilidadDespuesDeGGFF * 0.28;

    //sum for total
    var total = 0;
    total = total + costoTerreno;
    total = total + costosDirectosTotal;
    total = total + costosIndirectosTotal;
    total = total + comisionVentas;
    total = total + intereses;
    total = total + igvAPagar;
    total = total + ir;

    return total;
  }

  getCostosSubtotal(interesTotalTerreno, interesTotalPromotor){

    var areaDptos = this.areaDptosTotal;
    var costoTerreno = this.costoTerreno;
    var costosDirectosTotal = this.getCostosDirecto();
    var costosIndirectosTotal = this.getCostosIndirectos();

    //Calculate Comision
    var ventasDptos = this.ventasDptos;
    var ventasCocheras = this.ventasCocheras;
    var ventasTotal = ventasDptos + ventasCocheras;
    var comisionVentas = ventasDptos * 0.04;

    //sum for total
    var total = 0;
    total = total + costoTerreno;
    total = total + costosDirectosTotal;
    total = total + costosIndirectosTotal;
    total = total + comisionVentas;

    return total;
  }

  getUtilidadProyectoTable(interesTotalTerreno, interesTotalPromotor){
    // ['indirectosTitulo','dolarMonto','dolarPorMqVentas'];
    let rows = [];
    let areaTechada = this.areaTechadaTotal;

    let ventasDptos = this.ventasDptos;
    let ventasCocheras = this.ventasCocheras;
    let ventasTotal = ventasDptos + ventasCocheras;

    let costosTotal = this.getCostosTotale(interesTotalTerreno, interesTotalPromotor);

    let utilidad = ventasTotal - costosTotal;

    let utilidadRow = {
      indirectosTitulo: 'Ventas Total',
      dolarMonto: ventasTotal,
      dolarPorMqVentas: costosTotal/areaTechada
    }
    rows.push(utilidadRow);

    utilidadRow = {
      indirectosTitulo: 'Costos Total',
      dolarMonto: costosTotal,
      dolarPorMqVentas: costosTotal/areaTechada
    }
    rows.push(utilidadRow);

    utilidadRow = {
      indirectosTitulo: 'Utilidad Neta',
      dolarMonto: utilidad,
      dolarPorMqVentas: utilidad/areaTechada
    }
    rows.push(utilidadRow);

    return rows;

  }

  getUtilidadProyecto(interesTotalTerreno, interesTotalPromotor){
    let areaTechada = this.areaTechadaTotal;

    let ventasDptos = this.ventasDptos;
    let ventasCocheras = this.ventasCocheras;
    let ventasTotal = ventasDptos + ventasCocheras;

    let costosTotal = this.getCostosTotale(interesTotalTerreno, interesTotalPromotor);

    let utilidad = ventasTotal - costosTotal;

    return utilidad;
  }

  getRatiosGestionTable(interesTotalTerreno, interesTotalPromotor, aportePropio){
    // ['indirectosTitulo', 'proyectoRatios', 'bancoRatios']

    let rows = [];
    let areaTechada = this.areaTechadaTotal;

    let ventasDptos = this.ventasDptos;
    let ventasCocheras = this.ventasCocheras;
    let ventasTotal = ventasDptos + ventasCocheras;

    var comisionVentas = ventasDptos * 0.04;

    var intereses = interesTotalTerreno + interesTotalPromotor;

    let costosIndirectos = this.getCostosIndirectos();
    let costosSubtotal = this.getCostosSubtotal(interesTotalTerreno, interesTotalPromotor);
    let costosTotal = this.getCostosTotale(interesTotalTerreno, interesTotalPromotor);

    let aportePropioProyecto =  ((aportePropio/100) * this.costoTerreno) +
                                ((aportePropio/100) * this.getCostosDirecto()) +
                                costosIndirectos +
                                intereses +
                                comisionVentas;

    let utilidad = ventasTotal - costosTotal;

    let utilVentasRatioProyecto = (utilidad/ventasTotal);
    let utilInversionTotalRatioProyecto = (utilidad/costosSubtotal);
    let utilCostoTotalRatioProyecto = (utilidad/costosTotal);
    let utilAportePropioRatioProyecto =  (utilidad/aportePropioProyecto);

    let utilVentasRatioBanco = 0.13;
    let utilInversionTotalRatioBanco = 0.14;
    let utilCostoTotalRatioBanco = 0.12;
    let utilAportePropioRatioBanco = 0.28;

    let ratioRow = {
      indirectosTitulo: 'Util / Ventas',
      proyectoRatios: utilVentasRatioProyecto,
      bancoRatios: utilVentasRatioBanco
    }
    rows.push(ratioRow);

    ratioRow = {
      indirectosTitulo: 'Util./ Inversión total',
      proyectoRatios: utilInversionTotalRatioProyecto,
      bancoRatios: utilInversionTotalRatioBanco
    }
    rows.push(ratioRow);

    ratioRow = {
      indirectosTitulo: 'Util. / costo total proyecto',
      proyectoRatios: utilCostoTotalRatioProyecto,
      bancoRatios: utilCostoTotalRatioBanco
    }
    rows.push(ratioRow);

    ratioRow = {
      indirectosTitulo: 'Util. / Aporte propio',
      proyectoRatios: utilAportePropioRatioProyecto,
      bancoRatios: utilAportePropioRatioBanco
    }
    rows.push(ratioRow);

    return rows;

  }
}
module.exports = CostosResults;
