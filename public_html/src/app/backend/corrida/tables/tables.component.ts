import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CabidaTableDataService } from '../../../shared/corrida-table-data.service';
import { CorridaTableDataService } from '../../../shared/corrida-table-data.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  @Input() tableCategory: string;
  @Input() proyectoForm: FormGroup;

  //tables categories to show
  cabidaCategory: boolean;
  corridaCategory: boolean;
  financiamientoCategory: boolean;
  flujoCategory: boolean;

  //collapseCards
  cabidaCollapsed: boolean;
  corridaCollapsed: boolean;

  primerPisoColumns = ['primerAptNumber', 'primerAptType','primerAptArea','primerAptCocheras'];
  tipicoPisoColumns = ['tipicoAptNumber', 'tipicoAptType','tipicoAptArea','tipicoAptCocheras'];
  primerPisoTotalColumns = ['primerAptPorPiso', 'primerPisoAreaTechada','primerPisoAreaComunTotal','primerPisoAreaVendible'];
  tipicoPisoTotalColumns = ['tipicoAptPorPiso', 'tipicoPisoAreaTechada','tipicoPisoAreaComunTotal','tipicoPisoAreaVendible'];
  terrazaPisoColumns = ['terrazaAptNumber', 'terrazaAptType','terrazaAptAreaTechada','terrazaAptAreaLibre','terrazaAptCocheras'];
  terrazaPisoTotalColumns = ['terrazaAptPorPiso', 'terrazaPisoAreaTechada','terrazaPisoAreaComunTotal','terrazaPisoAreaLibre','terrazaPisoAreaVendible'];
  totalColumns = ['totalPisos', 'totalApts', 'totalAreaTechada','totalAreaComun', 'totalAreaLibre', 'totalAreaVendible', 'totalcocheras'];
  cocheras = ['cocherasTitulo', 'cocherasCantidad', 'cocherasArea'];

  ventasColumns = ['ventasDptoCount', 'ventasDptoNum', 'ventasDptoTipo', 'ventasAreaTechada', 'ventasAreaLibre', 'ventasAreaOcupada', 'ventasPrecioDptoMq', 'ventasPrecioDpto', 'ventasPrecioCochera', 'ventasPrecioDptoSinCochera'];

  costosDirectosColumns = ['directosTitulo','proporciones', 'metrosCuadrado', 'dolarPorMq', 'costoDolar'];
  costosIndirectosColumns = ['indirectosTitulo', 'medida', 'cantidad', 'cu', 'totalDolares' ]; //'totalSoles'
  //reusing existing columns
  costosTotales = ['indirectosTitulo', 'proporciones', 'costoDolar', 'dolarPorMq' ]; //'totalSoles'
  utilidadColumns = ['indirectosTitulo','dolarMonto','dolarPorMqVentas'];
  ratiosDeGestionColumns = ['indirectosTitulo', 'proyectoRatios', 'bancoRatios'];


  showTerraceTable: boolean;
  showLastFloorTable: boolean;

  constructor(private dataService: CabidaTableDataService, private dataServiceCorrida: CorridaTableDataService) { }

  ngOnInit() {
    console.log('IN THE TABLE COMPONONENT INIT');
    console.log('THE TABLE CATEGEORY: ' + this.tableCategory);
    this.cabidaCollapsed = false;
    this.corridaCollapsed = false;
    //determined the table category requestes
    switch(this.tableCategory) {
       case 'cabida': {
          this.cabidaCategory = true;
          this.corridaCategory = false;
          this.financiamientoCategory = false;
          this.flujoCategory = false;
          console.log('cabida');
          break;
       }
       case 'corrida': {
         this.cabidaCategory = false;
         this.corridaCategory = true;
         this.financiamientoCategory = false;
         this.flujoCategory = false;
         console.log('corrida');
          break;
       }
       case 'financiamiento': {
         this.cabidaCategory = false;
         this.corridaCategory = false;
         this.financiamientoCategory = true;
         this.flujoCategory = false;
         console.log('finance');
          break;
       }
       case 'flujo': {
         this.cabidaCategory = false;
         this.corridaCategory = false;
         this.financiamientoCategory = false;
         this.flujoCategory = true;
         console.log('flujo');
          break;
       }
       case 'all': {
         this.cabidaCategory = true;
         this.corridaCategory = true;
         this.financiamientoCategory = true;
         this.flujoCategory = true;
         console.log('all');
          break;
       }
       default: {
          console.log('THE DEFAULT TABLE TYPE');
          break;
       }
    }


    //if there is a terrace then show the table
    this.dataService.showTerraceTable
    .subscribe((toShow: boolean) => {
                  console.log('switching showTerraceTable to: ' + toShow);
                  this.showTerraceTable = toShow;
                },
                err => {
                console.log(err);
    });

    this.dataService.showLastFloorTable
    .subscribe((show: boolean) => {

                },
                err => {
                console.log(err);
    });
  }

}
