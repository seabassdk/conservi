import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import { FormGroup, Validators, FormControl, FormsModule, NgSelectOption } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { CabidaDataService } from '../../../shared/cabida-data.service';

@Component({
  selector: 'app-main-edit',
  templateUrl: './main-edit.component.html',
  styleUrls: ['./main-edit.component.css']
})
export class MainEditComponent implements OnInit {
  @ViewChild('agmcircle') agmcircle: ElementRef;
  @Input() proyectoGen: FormGroup;
  @Output() idOfSelectedCorrida = new EventEmitter<String>();
  addressExists:boolean;

  lat: number = -12.046374;
  lng: number = -77.042793;

  corridas: any[];
  selectDefault: number = 0;
  selectedEditId: string;

  zoomlvl: number = 16;
  iconUrl = {
    url: 'assets/images/home-icon.png',
    scaledSize: {
        width: 20,
        height: 20
    }
  }

  // cityBounds = new google.maps.LatLngBounds(
  // new google.maps.LatLng(-12.046374, -77.042793),
  // new google.maps.LatLng(-13.200918, -76.295269));
  // -11.742199, -76.681608
  // -12.389376, -77.170161
  // options = {
  //   bounds: {east: -11.742199; north: -76.681608; south: -77.170161; west: -12.389376 },
  //   types: ['geocode'],
  //   componentRestrictions: {country: 'pe'}
  // };
  options = {
    componentRestrictions: {country: 'pe'}
  };

  constructor(private dataService: CabidaDataService) { }

  ngOnInit() {
    this.addressExists = true;
    this.proyectoGen.get("direccion").setValidators([Validators.required,this.addressValidator.bind(this)]); //this.addressValidator(this.addressExists)]);
    this.proyectoGen.get("direccion").updateValueAndValidity();

    this.populateCorridasEditSelection();




  }

  handleAddressChange(address: any) {
    console.log('ADDRESS CHANGE EVENT');
    console.log(address);
    if(address === undefined){
      this.addressExists = false;
    }else{
      this.lat = address.geometry.location.lat();
      this.lng = address.geometry.location.lng();

      if((this.lat !== undefined || this.lat !== 0) && (this.lng !== undefined || this.lng !== 0)) {

        // getElementsByClassName
        var streetNumber = this.getAddressType(address.address_components, 'street_number');
        var streetName = this.getAddressType(address.address_components, 'route');
        var districtName = this.getAddressType(address.address_components, 'locality');
        var buildingName = address.name;



        if(buildingName.includes(streetName)){
          buildingName = "";
        }
        else{
          buildingName = buildingName + ",";
        }

        console.log('The street number: ' + streetNumber);
        console.log('the street name: ' + streetName);
        console.log('the district name: ' + districtName);
        console.log('the building name: ' + buildingName);

        if(streetNumber === undefined || streetNumber === 's/n'){
          streetNumber = "";
        }

        this.addressExists = true;
        this.proyectoGen.patchValue(
           {
            addressObject : JSON.stringify(address),
            direccion:  buildingName + " " + streetName + " " + streetNumber + ", " + districtName,
            distrito:  address.address_components[2].long_name,
            direccionNumero:  address.address_components[0].long_name
           }
        );



      } else{
        this.addressExists = false;
      }
  }

    //emit to parent notifying to change the boolean that address exists
    this.proyectoGen.get("direccion").updateValueAndValidity();

  }

  //need locality, route, street_number (not 's/n')

  getAddressType(addressComponent, searchFor){
    var found;
    for (let entry of addressComponent) {
      found = entry.long_name
      for (let type of entry.types) {
        if(searchFor === type){
          return found;
        }
      }
    }
  }


  onAddressChange(event:any){
    this.handleAddressChange(undefined);

  }

  ngOnDestroy() {

  }

  // addressValidator(): ValidatorFn {
  //     return (control: AbstractControl): { [key: string]: boolean } | null => {
  //         if (control.value !== undefined && (!this.addressExists)) {
  //             return { 'Notexists': true };
  //         }
  //         return null;
  //     };
  // }

  addressValidator(control: FormControl): {[s: string] :boolean}  {     //it must return a key value pair where the key is a string and value a boolean
    if(!this.addressExists) {
      return {'Validator: notExists': true};
    }
    return null;
  }

  //Call the server to get all corridas
  populateCorridasEditSelection(){
    this.dataService.getCorridas()
    .subscribe(data => {

      //returns an array with the objects needed to populate the edit select
      console.log('this corridas...');
      console.log(data);
      console.log('this selected default; ' + this.selectDefault);

      this.corridas = data;
      this.selectedEditId = this.corridas[this.selectDefault].id;
    },
                err => {
                console.log(err);
    });
  }

  onSelectChange(event: any){

    this.selectedEditId = this.corridas[this.selectDefault].id;
  }
  corridaIdForInputValues(){
    this.idOfSelectedCorrida.next(this.selectedEditId);
  }


}
