import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

import { CabidaDataService } from '../../shared/cabida-data.service';
// import { CabidaTableDataService } from '../../shared/cabida-table-data.service';

@Component({
  selector: 'app-corrida',
  templateUrl: './corrida.component.html',
  styleUrls: ['./corrida.component.css']
})
export class CorridaComponent implements OnInit {

  proyectoForm: FormGroup;

  tabSelect: number;
  showTables: boolean = false;

  test: string = 'test string'

  testing(){
    // console.log('testing...');
    // console.log(this.proyectoForm);
    // let test = this.proyectoForm.controls.cabida.controls.cabConstruccion.get('areaTerreno').value;
    // let test1 = this.proyectoForm.controls.corrida.controls.terrenoCostos.get('costoTerrenoSoles').value;
    // console.log('the value of cabida test: ' + test);
    // console.log('the value of cabida test: ' + test1);
    // this.cabidaTableDataService.getCabidaTableData(this.proyectoForm.getRawValue(), 'test')
    // .subscribe(res => {
    //             console.log(res);
    //             },
    //             err => {
    //               console.log(err);
    //             });
  }

  constructor(private fb: FormBuilder, private dataService: CabidaDataService, private http: HttpClient) { }

  ngOnInit() {
    //set tabSelect to 1 to display main-edit
    this.tabSelect = 1;
            // 'areaTerreno': new FormControl('636', [Validators.required, Validators.min(0), Validators.max(20000000)]),
    //Using form builder to create the form
    this.proyectoForm = this.fb.group({
      proyectoGen: this.fb.group({
        'nombreProyecto': new FormControl('', [Validators.required]),
        'direccion': new FormControl('', [Validators.required]),
        'distrito': new FormControl(''),
        'direccionNumero': new FormControl(''),
        'precio': new FormControl('', [Validators.required]),
        'area': new FormControl('', [Validators.required]),
        'addressObject': new FormControl('')
      }),
      cabida: this.fb.group({
        cabConstruccion: this.fb.group({
          'areaTerreno': new FormControl('', [Validators.required]),
          'altura': new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
          'coefAreaConstruida': new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
          'coefAreaLibre': new FormControl('', [Validators.required,Validators.min(1), Validators.max(100)]),
          'coefAreaComun': new FormControl('', [Validators.required,Validators.min(1), Validators.max(100)])
        }),
        cabAreasDptos: this.fb.group({
          'areaMax': new FormControl('', [Validators.required,Validators.min(0), Validators.max(1000)]),
          'areaMid': new FormControl('', [Validators.required,Validators.min(0), Validators.max(1000)]),
          'areaMin': new FormControl('', [Validators.required,Validators.min(0), Validators.max(1000)]),
          'dormsAreaMax': new FormControl(''),
          'dormsAreaMid': new FormControl(''),
          'dormsAreaMin': new FormControl(''),
          'cocherasPorDormsOption': new FormControl('false')
        }),
        cabCocheras: this.fb.group({
          'cochVisitas': new FormControl('', [Validators.required,Validators.min(1), Validators.max(100)]),
          'cochPorDpto': new FormControl('', [Validators.required,Validators.min(1), Validators.max(5)]),
          'areaTechaSotano': new FormControl('', [Validators.required,Validators.min(1), Validators.max(100)]),
          'minAreaTechaSotano': new FormControl('', [Validators.required,Validators.min(1), Validators.max(100)]),
          'areaCochera': new FormControl('', [Validators.required,Validators.min(1), Validators.max(100)]),
          'cocherasPorDormsOption': new FormControl('false')

        }),
        cabPrimerPisoAreaComun: this.fb.group({
          'areaComunAbs': new FormControl(''),
          'areaComunRel': new FormControl(''),
          'primerPisoSelection': new FormControl('1')

        }),
        cabTerraza: this.fb.group({
          'terrazaAreaLibre': new FormControl(''),
          'terrazaAreaTechada': new FormControl(''),
          'terrazaOption': new FormControl('')
        })
      }),
      corrida: this.fb.group({
        generalInfo : this.fb.group({
          'areaTerreno': new FormControl('', [Validators.required]),
          'cambio': new FormControl('', [Validators.required])
        }),
        terrenoCostos : this.fb.group({
          'costoTerrenoSoles': new FormControl('', [Validators.required]),
          'costoTerrenoSolesMq': new FormControl('', [Validators.required]),
          'costoTerrenoDolares': new FormControl('', [Validators.required]),
          'costoTerrenoDolaresMq': new FormControl('', [Validators.required])
        }),
        proyectoVentas: this.fb.group({
          'ventasSolesMq': new FormControl('', [Validators.required]),
          'ventasDolaresMq': new FormControl('', [Validators.required]),
          'ventasCocherasSolesMq': new FormControl('', [Validators.required]),
          'ventasCocherasDolaressMq': new FormControl('', [Validators.required]),
          'ventasCoeffAreaLibre': new FormControl('', [Validators.required])
        }),
        costosDirectos : this.fb.group({
          'costoConstruccionSotano': new FormControl('350', [Validators.required]),
          'costoConstruccionDptos': new FormControl('450', [Validators.required]),
          'costoConstruccionAreaComun': new FormControl('250', [Validators.required]),
          'sistemaContraincendio': new FormControl('15', [Validators.required]),
          'extraccionMonoxido': new FormControl('12', [Validators.required]),
          'ascensor': new FormControl('40000', [Validators.required]),
          'ascensorCantidad': new FormControl('1', [Validators.required]),
          'bombasElectricas': new FormControl('15000', [Validators.required]),
          'bombasElectricasCantidad': new FormControl('1', [Validators.required]),
          'costosDirectosPlus' : this.fb.array([])
        }),
        costosIndirectos : this.fb.group({
          'proyectoIndirecto': new FormControl('10', [Validators.required]),
          'licenciaConformidadObra': new FormControl('1.5', [Validators.required]),
          'autoavaluoPropiedadMayor': new FormControl('100', [Validators.required]),
          'abogadoRegistros': new FormControl('50', [Validators.required]),
          'notariaRegistrosDeptos': new FormControl('50', [Validators.required]),
          'notariaRegistrosTerreno': new FormControl('5000', [Validators.required]),
          'alcabala': new FormControl('3', [Validators.required]),
          'demolicion': new FormControl('', [Validators.required]),
          'serpar': new FormControl('', [Validators.required]),
          'costosIndirectosPlus' : this.fb.array([])
        })
      }),
      financiamiento: this.fb.group({
        'finTerrenoTasaAnual': new FormControl('9'),
        'finTerrenoPeriodoDesembolso': new FormControl('8'),
        'finTerrenoPeriodoAmortizacion': new FormControl('3'),
        'finPromotorTasaAnual': new FormControl('8'),
        'finPromotorPeriodoDesembolso': new FormControl('11'),
        'finPromotorPeriodoAmortizacion': new FormControl('2'),
        'coefFinTerrenoAportePropio': new FormControl('50'),
        'coefFinPromotorAportePropio': new FormControl('20')
      })
    });

    // this.proyectoForm.statusChanges.subscribe(
    //   (status) => {
    //     console.log(status);
    //     if(status==='VALID'){
    //       console.log('Getting form values.');
    //       this.getFormValues();
    //     }
    //   }
    // );
  }



  getFormValues(){
     console.log(this.proyectoForm.getRawValue());
  }

  onSubmit(){
    console.log("Sending data");



    // console.log(this.proyectoForm.getRawValue());
    let formValues = this.proyectoForm.getRawValue(); // {name: '', description: ''}
    // let serializedForm = JSON.stringify(formObj);
    // let formValues = this.proyectoForm.value;
    var serializedForm = JSON.stringify(formValues);
    // var sendData = "{form: " + serializedForm +"}"
    console.log('SERIALIZED FORM: ');
    console.log(serializedForm);
    // var datajson = JSON.parse(serializedForm);
    this.dataService.sendCorData(formValues)
    .subscribe(res => console.log(res),
                err => {
                console.log(err);
    });


    // console.log('serialized Form: ');
    // let serializedForm = JSON.stringify(formObj);
    // console.log(serializedForm);
    console.log('done.');
  }

  traverseFromGroup(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.controls[key];

        if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
            this.traverseFromGroup(abstractControl);
        } else {
            console.log(abstractControl);
        }
    });
  }

  populateForm(id: string){
    console.log("from corrida component. Go id: " + id);
    this.dataService.getCorrida(id)
    .subscribe(res => {
              console.log('Response from SERVER.');
              console.log(res);
              this.proyectoForm = this.newFormwithValues(res);
              // this.newFormwithValues(res);
              },
                err => {
                console.log('ERROR.');
                console.log(err);
                });
  }

  testHttp(){
    // var someData =     {
    //         "name": "Customer004",
    //         "email": "customer004@email.com",
    //         "tel": "0000252525"
    //     };
    // var serializedForm = JSON.stringify(someData);
    let formValues = this.proyectoForm.value;
    console.log(formValues);
    var serializedForm = JSON.stringify(formValues);

    var someData = this.proyectoForm.getRawValue();
    // var serializedForm = JSON.stringify(someData);
    this.http.post("http://localhost:8000/test",serializedForm)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
        },
        error => {
            console.log("Error", error);
        }
    );
    // console.log("Receive data...");
    // this.dataService.getData()
    //   .subscribe(
    //     (response: Response) => {
    //       console.log(response);
    //     }
    //   );
  }

  newFormwithValues(dbForm: any): FormGroup{

    let formGroup = this.fb.group({
      proyectoGen: this.fb.group({
        'nombreProyecto': new FormControl(dbForm.projectMain.nombreProyecto, [Validators.required]),
        'direccion': new FormControl(dbForm.projectMain.direccion, [Validators.required]),
        'distrito': new FormControl(dbForm.projectMain.distrito),
        'direccionNumero': new FormControl(dbForm.projectMain.direccionNumero),
        'precio': new FormControl(dbForm.projectMain.precio, [Validators.required]),
        'area': new FormControl(dbForm.projectMain.area, [Validators.required]),
        'addressObject': new FormControl(dbForm.projectMain.addressObject)
      }),
      cabida: this.fb.group({
        cabConstruccion: this.fb.group({
          'areaTerreno': new FormControl(dbForm.cabida.construccion.areaTerreno),
          'altura': new FormControl(dbForm.cabida.construccion.altura, [Validators.required, Validators.min(1), Validators.max(100)]),
          'coefAreaConstruida': new FormControl(dbForm.cabida.construccion.coefAreaConstruida, [Validators.required,Validators.min(0), Validators.max(100)]),
          'coefAreaLibre': new FormControl(dbForm.cabida.construccion.coefAreaLibre, [Validators.required,Validators.min(1), Validators.max(100)]),
          'coefAreaComun': new FormControl(dbForm.cabida.construccion.coefAreaComun, [Validators.required,Validators.min(1), Validators.max(100)])
        }),
        cabAreasDptos: this.fb.group({
          'areaMax': new FormControl(dbForm.cabida.dptos.areaMax, [Validators.required,Validators.min(0), Validators.max(1000)]),
          'areaMid': new FormControl(dbForm.cabida.dptos.areaMid, [Validators.required,Validators.min(0), Validators.max(1000)]),
          'areaMin': new FormControl(dbForm.cabida.dptos.areaMin, [Validators.required,Validators.min(0), Validators.max(1000)]),
          'dormsAreaMax': new FormControl(dbForm.cabida.dptos.dormsAreaMax),
          'dormsAreaMid': new FormControl(dbForm.cabida.dptos.dormsAreaMid),
          'dormsAreaMin': new FormControl(dbForm.cabida.dptos.dormsAreaMin),
          'cocherasPorDormsOption': new FormControl(dbForm.cabida.dptos.cocherasPorDormsOption)
        }),
        cabCocheras: this.fb.group({
          'cochVisitas': new FormControl(dbForm.cabida.cocheras.cochVisitas, [Validators.required,Validators.min(1), Validators.max(100)]),
          'cochPorDpto': new FormControl(dbForm.cabida.cocheras.cochPorDpto),
          'areaTechaSotano': new FormControl(dbForm.cabida.cocheras.areaTechaSotano, [Validators.required,Validators.min(1), Validators.max(100)]),
          'minAreaTechaSotano': new FormControl(dbForm.cabida.cocheras.minAreaTechaSotano, [Validators.required,Validators.min(1), Validators.max(100)]),
          'areaCochera': new FormControl(dbForm.cabida.cocheras.areaCochera, [Validators.required,Validators.min(1), Validators.max(100)]),
          'cocherasPorDormsOption': new FormControl(dbForm.cabida.cocheras.cocherasPorDormsOption)

        }),
        cabPrimerPisoAreaComun: this.fb.group({
          'areaComunAbs': new FormControl(dbForm.cabida.primerpiso.areaComunAbs),
          'areaComunRel': new FormControl(dbForm.cabida.primerpiso.areaComunRel),
          'primerPisoSelection': new FormControl(dbForm.cabida.primerpiso.primerPisoSelection)

        }),
        cabTerraza: this.fb.group({
          'terrazaAreaLibre': new FormControl(dbForm.cabida.terraza.terrazaAreaLibre),
          'terrazaAreaTechada': new FormControl(dbForm.cabida.terraza.terrazaAreaTechada),
          'terrazaOption': new FormControl(dbForm.cabida.terraza.terrazaOption)
        })
      }),
      corrida: this.fb.group({
        generalInfo : this.fb.group({
          'areaTerreno': new FormControl(dbForm.corrida.generalInfo.areaTerreno, [Validators.required]),
          'cambio': new FormControl(dbForm.corrida.generalInfo.cambio, [Validators.required])
        }),
        terrenoCostos : this.fb.group({
          'costoTerrenoSoles': new FormControl(dbForm.corrida.terrenoCostos.costoTerrenoSoles, [Validators.required]),
          'costoTerrenoSolesMq': new FormControl(dbForm.corrida.terrenoCostos.costoTerrenoSolesMq, [Validators.required]),
          'costoTerrenoDolares': new FormControl(dbForm.corrida.terrenoCostos.costoTerrenoDolares, [Validators.required]),
          'costoTerrenoDolaresMq': new FormControl(dbForm.corrida.terrenoCostos.costoTerrenoDolaresMq, [Validators.required])
        }),
        proyectoVentas: this.fb.group({
          'ventasSolesMq': new FormControl(dbForm.corrida.proyectoVentas.ventasSolesMq, [Validators.required]),
          'ventasDolaresMq': new FormControl(dbForm.corrida.proyectoVentas.ventasDolaresMq, [Validators.required]),
          'ventasCocherasSolesMq': new FormControl(dbForm.corrida.proyectoVentas.ventasCocherasSolesMq, [Validators.required]),
          'ventasCocherasDolaressMq': new FormControl(dbForm.corrida.proyectoVentas.ventasCocherasDolaressMq, [Validators.required]),
          'ventasCoeffAreaLibre': new FormControl(dbForm.corrida.proyectoVentas.ventasCoeffAreaLibre, [Validators.required])
        }),
        costosDirectos : this.fb.group({
          'costoConstruccionSotano': new FormControl(dbForm.corrida.costosDirectos.costoConstruccionSotano, [Validators.required]),
          'costoConstruccionDptos': new FormControl(dbForm.corrida.costosDirectos.costoConstruccionDptos, [Validators.required]),
          'costoConstruccionAreaComun': new FormControl(dbForm.corrida.costosDirectos.costoConstruccionAreaComun, [Validators.required]),
          'sistemaContraincendio': new FormControl(dbForm.corrida.costosDirectos.sistemaContraincendio, [Validators.required]),
          'extraccionMonoxido': new FormControl(dbForm.corrida.costosDirectos.extraccionMonoxido, [Validators.required]),
          'ascensor': new FormControl(dbForm.corrida.costosDirectos.ascensor, [Validators.required]),
          'ascensorCantidad': new FormControl(dbForm.corrida.costosDirectos.ascensorCantidad, [Validators.required]),
          'bombasElectricas': new FormControl(dbForm.corrida.costosDirectos.bombasElectricas, [Validators.required]),
          'bombasElectricasCantidad': new FormControl(dbForm.corrida.costosDirectos.bombasElectricasCantidad, [Validators.required]),
          'costosDirectosPlus' : this.fb.array(dbForm.corrida.costosDirectos.costosDirectosPlus)
        }),
        costosIndirectos : this.fb.group({
          'proyectoIndirecto': new FormControl(dbForm.corrida.costosIndirectos.proyectoIndirecto, [Validators.required]),
          'licenciaConformidadObra': new FormControl(dbForm.corrida.costosIndirectos.licenciaConformidadObra, [Validators.required]),
          'autoavaluoPropiedadMayor': new FormControl(dbForm.corrida.costosIndirectos.autoavaluoPropiedadMayor, [Validators.required]),
          'abogadoRegistros': new FormControl(dbForm.corrida.costosIndirectos.abogadoRegistros, [Validators.required]),
          'notariaRegistrosDeptos': new FormControl(dbForm.corrida.costosIndirectos.notariaRegistrosDeptos, [Validators.required]),
          'notariaRegistrosTerreno': new FormControl(dbForm.corrida.costosIndirectos.notariaRegistrosTerreno, [Validators.required]),
          'alcabala': new FormControl(dbForm.corrida.costosIndirectos.alcabala, [Validators.required]),
          'demolicion': new FormControl(dbForm.corrida.costosIndirectos.demolicion, [Validators.required]),
          'serpar': new FormControl(dbForm.corrida.costosIndirectos.serpar, [Validators.required]),
          'costosIndirectosPlus' : this.fb.array([])
          //MISSING IN THE WEB SERVER costosIndirectosPlus
        })
      }),
      financiamiento: this.fb.group({
        'finTerrenoTasaAnual': new FormControl('9'),
        'finTerrenoPeriodoDesembolso': new FormControl('8'),
        'finTerrenoPeriodoAmortizacion': new FormControl('3'),
        'finPromotorTasaAnual': new FormControl('8'),
        'finPromotorPeriodoDesembolso': new FormControl('11'),
        'finPromotorPeriodoAmortizacion': new FormControl('2'),
        'coefFinTerrenoAportePropio': new FormControl('50'),
        'coefFinPromotorAportePropio': new FormControl('20')
      })
    });

    console.log('Form Group with values:');
    console.log(formGroup);
    return formGroup;
  }

}
