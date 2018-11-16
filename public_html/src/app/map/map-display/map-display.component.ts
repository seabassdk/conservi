import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MaplatlngService } from '../../map/maplatlng.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.css']
})
export class MapDisplayComponent implements OnInit {
  @ViewChild('agmcircle') agmcircle: ElementRef;
  lat: number = -12.046374;
  lng: number = -77.042793;
  zoomlvl: number = 15;
  // iconUrl = {
  //   url: 'assets/images/home-icon.png',
  //   scaledSize: {
  //       width: 20,
  //       height: 20
  //   }
  // }

  constructor(private maplatlngService: MaplatlngService) { }

  ngOnInit() {
    this.maplatlngService.latlngActivated.subscribe(
      (address: Address) => {
          // update the map with new lat lng
          console.log('from display: The latitude: ' + address.geometry.location.lat());
          console.log('from display: The latitude: ' + address.geometry.location.lng());
          this.lat = address.geometry.location.lat();
          this.lng = address.geometry.location.lng();
          console.log(this.agmcircle);
      }
    );
  }

  ngOnDestroy(){
    console.log('MAP DISPLAY being destroyed');
    // this.maplatlngService.latlngActivated.unsubscribe();
  }

}
