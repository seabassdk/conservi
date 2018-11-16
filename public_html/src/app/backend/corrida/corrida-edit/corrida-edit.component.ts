import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-corrida-edit',
  templateUrl: './corrida-edit.component.html',
  styleUrls: ['./corrida-edit.component.css']
})
export class CorridaEditComponent implements OnInit {
  @Input() proyectoForm: FormGroup;
  @Input() cabida: FormGroup;
  @Input() corrida: FormGroup;
  @Input() generalInfo: FormGroup;
  @Input() terrenoCostos: FormGroup;
  @Input() proyectoVentas: FormGroup;
  @Input() costosDirectos: FormGroup;
  @Input() costosIndirectos: FormGroup;
  @Input() costosDirectosPlus: FormArray;
  @Input() costosIndirectosPlus: FormArray;

 isCostosDirectosCollapsed: boolean;
 isCostosIndirectosCollapsed: boolean;
  constructor() { }

  ngOnInit() {
    this.isCostosDirectosCollapsed = false;
    this.isCostosIndirectosCollapsed = false;
  }

  testing(){
    console.log('testing...');
    console.log(this.proyectoForm);
    // let test1 = this.proyectoForm.controls.corrida.controls.terrenoCostos.get('costoTerrenoSoles').value;
    // console.log('the value of test: ' + test1);
  }
  onAddControlDirectoItem(){
    //have to cast to avoid errors
    (<FormArray>this.costosDirectos.get('costosDirectosPlus')).push(this.createItem());
  }

  onDeleteCostoDirecto(index: number) {
    (<FormArray>this.costosDirectos.get('costosDirectosPlus')).removeAt(index);
  }

  onAddControlCostoIndirectoItem(){
    //have to cast to avoid errors
    (<FormArray>this.costosIndirectos.get('costosIndirectosPlus')).push(this.createItem());
  }

  onDeletecostoIndirectos(index: number) {
    (<FormArray>this.costosIndirectos.get('costosIndirectosPlus')).removeAt(index);
  }

  createItem(): FormGroup {
    return new FormGroup({
      nombre: new FormControl('', Validators.required),
      costo: new FormControl('', Validators.required)
    });
  }

  onDecreaseAmount(formControl: FormControl){
    if (!Number.isNaN(formControl.value) && formControl.value > 0 )
      formControl.setValue(+formControl.value -1);
  }

  onIncreaseAmount(formControl: FormControl){
    if (!Number.isNaN(formControl.value) && formControl.value >= 0 )
      formControl.setValue(+formControl.value +1);
  }

}
