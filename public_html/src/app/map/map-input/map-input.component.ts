import { ViewChild, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { MaplatlngService } from '../../map/maplatlng.service';

import { Response } from '@angular/http';


@Component({
  selector: 'app-map-input',
  templateUrl: './map-input.component.html',
  styleUrls: ['./map-input.component.css']
})
export class MapInputComponent implements OnInit {
  @Output() onResultsCheck = new EventEmitter();
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  CustomerInputForm: FormGroup;
  lat: number;
  lng: number;

  options = {
    componentRestrictions: {country: 'pe'}
  };
  public handleAddressChange(address: Address) {
    // Do some stuff
    // console.log(address);
    // console.log('Map input: The latitude: ' + address.geometry.location.lat());
    // console.log('Map input: The latitude: ' + address.geometry.location.lng());
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();

    if((this.lat !== undefined || this.lat !== 0) && (this.lat !== undefined || this.lat !== 0)) {
      // console.log('this.lat = ' + this.lat);
      // console.log('this.lat = ' + this.lng);
      this.maplatlngService.latlngActivated.next(address); //broadcast a change
    }

    var myAddress = JSON.stringify(address);
    // console.log('JSON STRINGIFIED');
    // console.log(myAddress);
  }
  constructor(private maplatlngService: MaplatlngService) { }

  ngOnInit() {
    this.CustomerInputForm = new FormGroup({
          'address': new FormControl(null, Validators.required),
          'price':    new FormControl(null,[Validators.required,Validators.pattern("^[0-9]*$")]),
          'area':   new FormControl(null,[Validators.required,Validators.pattern("^[0-9]*$")])
        });
  }



  receiveDataTest(){
    // console.log("button clicked...");
    // this.cabidaDataService.getData();
    // console.log("Receive data...");
    // this.cabidaDataService.getData()
    //   .subscribe(
    //     (response: Response) => {
    //       console.log(response);
    //     }
    //   );
  }

  submitForm(){
    console.log('emitting to parent..');
    this.onResultsCheck.emit();
  }

}
