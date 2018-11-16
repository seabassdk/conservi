import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-cabida-edit',
  templateUrl: './cabida-edit.component.html',
  styleUrls: ['./cabida-edit.component.css']
})


export class CabidaEditComponent implements OnInit {
  @Input() proyectoForm: FormGroup;
  @Input() cabida: FormGroup;
  @Input() cabConstruccion: FormGroup;
  @Input() cabAreasDptos: FormGroup;
  @Input() cabCocheras: FormGroup;
  @Input() cabPrimerPisoAreaComun: FormGroup;
  @Input() cabTerraza: FormGroup;
  @Input() areaTerrenoVal: String;

  isCollapsedConstruccion: boolean;
  isCollapsedDepas: boolean;
  isCollapsedCocheras: boolean;
  isCollapsedAreaComunPrimer: boolean;
  isCollapsedTerraza: boolean;

  cocherasPorDorm: boolean;
  primerPisoSelected: number;
  terraza: boolean;

  constructor() { }

  ngOnInit() {
    this.isCollapsedConstruccion = false;
    this.isCollapsedDepas = false;
    this.isCollapsedCocheras = false;
    this.isCollapsedAreaComunPrimer = false;
    this.isCollapsedTerraza = false;


    //initialize The Cocheras por departamento: affects COCHERAS AND DPTOS
    console.log('Cocheras por dorms: ' + this.cabAreasDptos.get('cocherasPorDormsOption').value );
    if(this.cabAreasDptos.get('cocherasPorDormsOption').value > 0)
      this.cocherasPorDorm = this.cabAreasDptos.get('cocherasPorDormsOption').value;
    else
      this.cocherasPorDorm = false;


    //initialize the PRIMER PISO ARE COMUN selector
    if(this.cabPrimerPisoAreaComun.get('primerPisoSelection').value > 0)
      this.primerPisoSelected = this.cabPrimerPisoAreaComun.get('primerPisoSelection').value;
    else
      this.primerPisoSelected = 1;

    //initialize the TERRAZA
    if(this.cabTerraza.get('terrazaOption').value > 0)
      this.terraza = this.cabTerraza.get('terrazaOption').value;
    else
      this.terraza = false;

    this.cabConstruccion.patchValue({'areaTerreno': this.areaTerrenoVal});

    this.cabPrimerPisoAreaComun.statusChanges.subscribe(
      (status) => {
        console.log(status);
      }
    );

    this.cabTerraza.statusChanges.subscribe(
      (status) => {
        // console.log(status);
      }
    );

    //Call the service that returns the data from the server here.


  }

  testing(){
    console.log('testing...');
    console.log(this.proyectoForm);
    // let test = this.proyectoForm.controls.cabida.controls.cabConstruccion.get('areaTerreno').value;
    // console.log('the value of test: ' + test);
  }

  //listen to changes on the select
  onPrimerPisoChange(val: any){
    console.log('CHANGE: primer piso change!');
    //for the ngIf
    this.primerPisoSelected = +val;
    //change the validations and set values
    this.changePrimeroPisoValidation(+val);
  }

  changePrimeroPisoValidation(val: number){
    console.log('CHANGE: primer piso VALIDATION change!');
    if(val===1){
      this.cabPrimerPisoAreaComun.get("primerPisoSelection").setValue(val);

      this.cabPrimerPisoAreaComun.get("areaComunRel").setValue('');
      this.cabPrimerPisoAreaComun.get("areaComunRel").setValidators([]);
      this.cabPrimerPisoAreaComun.get("areaComunRel").updateValueAndValidity();
      this.cabPrimerPisoAreaComun.get("areaComunAbs").setValue('');
      this.cabPrimerPisoAreaComun.get("areaComunAbs").setValidators([]);
      this.cabPrimerPisoAreaComun.get("areaComunAbs").updateValueAndValidity();

    }
    if(val===2){
      this.cabPrimerPisoAreaComun.get("primerPisoSelection").setValue(val);

      this.cabPrimerPisoAreaComun.get("areaComunRel").setValue('');
      this.cabPrimerPisoAreaComun.get("areaComunRel").setValidators([]);
      this.cabPrimerPisoAreaComun.get("areaComunRel").updateValueAndValidity();
      this.cabPrimerPisoAreaComun.get("areaComunAbs").setValidators([Validators.required,Validators.min(1), Validators.max(10000)]);
      this.cabPrimerPisoAreaComun.get("areaComunAbs").updateValueAndValidity();
    }

    if(val===3){
      this.cabPrimerPisoAreaComun.get("primerPisoSelection").setValue(val);

      this.cabPrimerPisoAreaComun.get("areaComunAbs").setValue('');
      this.cabPrimerPisoAreaComun.get("areaComunAbs").setValidators([]);
      this.cabPrimerPisoAreaComun.get("areaComunAbs").updateValueAndValidity();
      this.cabPrimerPisoAreaComun.get("areaComunRel").setValidators([Validators.required,Validators.min(1), Validators.max(100)]);
      this.cabPrimerPisoAreaComun.get("areaComunRel").updateValueAndValidity();
    }
  }

  //listen to changes on terrazas option
  onTerrazaChange(val: any){
  console.log('CHANGE: terrazas change!');
    this.terraza = val;
    this.changeTerrazaValidation(this.terraza);
  }

  changeTerrazaValidation(val: boolean){
  console.log('CHANGE: terrazas VALIDATION change!');
    if(val===true){
      this.cabTerraza.get("terrazaAreaLibre").setValidators([Validators.required,Validators.min(1), Validators.max(100)]);
      this.cabTerraza.get("terrazaAreaLibre").updateValueAndValidity();
      this.cabTerraza.get("terrazaAreaTechada").setValidators([Validators.required,Validators.min(1), Validators.max(100)]);
      this.cabTerraza.get("terrazaAreaTechada").updateValueAndValidity();
    }else{
      this.cabTerraza.get("terrazaAreaLibre").setValue('');
      this.cabTerraza.get("terrazaAreaLibre").setValidators([]);
      this.cabTerraza.get("terrazaAreaTechada").setValue('');
      this.cabTerraza.get("terrazaAreaTechada").setValidators([]);
      this.cabTerraza.get("terrazaAreaLibre").updateValueAndValidity();
      this.cabTerraza.get("terrazaAreaTechada").updateValueAndValidity();
    }

    this.cabTerraza.get('terrazaOption').setValue(val);
  }

  onCocherasDormChange(val: boolean){
    console.log('CHANGE: cocheras por dorms change!');
    this.onCocherasDormChangeValidations(val);
  }

  //onChange change the validations and set values
  onCocherasDormChangeValidations(val:boolean){
    console.log('CHANGE: cocheras por dorms VALIDATIONS change!');
    if(val===true){
      this.cabAreasDptos.get("dormsAreaMax").setValidators([Validators.required,Validators.min(1), Validators.max(10000)]);
      this.cabAreasDptos.get("dormsAreaMax").updateValueAndValidity();
      this.cabAreasDptos.get("dormsAreaMid").setValidators([Validators.required,Validators.min(1), Validators.max(10000)]);
      this.cabAreasDptos.get("dormsAreaMid").updateValueAndValidity();
      this.cabAreasDptos.get("dormsAreaMin").setValidators([Validators.required,Validators.min(1), Validators.max(10000)]);
      this.cabAreasDptos.get("dormsAreaMin").updateValueAndValidity();
      this.cabCocheras.get("cochPorDpto").setValue('');
      this.cabCocheras.get("cochPorDpto").setValidators([]);
      this.cabCocheras.get("cochPorDpto").updateValueAndValidity();
    }else{
      this.cabAreasDptos.get("dormsAreaMax").setValue('');
      this.cabAreasDptos.get("dormsAreaMax").setValidators([]);
      this.cabAreasDptos.get("dormsAreaMax").updateValueAndValidity();
      this.cabAreasDptos.get("dormsAreaMid").setValue('');
      this.cabAreasDptos.get("dormsAreaMid").setValidators([]);
      this.cabAreasDptos.get("dormsAreaMid").updateValueAndValidity();
      this.cabAreasDptos.get("dormsAreaMin").setValue('');
      this.cabAreasDptos.get("dormsAreaMin").setValidators([]);
      this.cabAreasDptos.get("dormsAreaMin").updateValueAndValidity();
      this.cabCocheras.get("cochPorDpto").setValidators([Validators.required,Validators.min(1), Validators.max(10000)]);
      this.cabCocheras.get("cochPorDpto").updateValueAndValidity();
    }
    this.cabAreasDptos.get("cocherasPorDormsOption").setValue(val);
    this.cabCocheras.get("cocherasPorDormsOption").setValue(val);

  }





}
