import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from '../shared/db-data.service';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendComponent implements OnInit {


  constructor(public router: Router, private dataService: DataService) { }

  ngOnInit() {}

  onActivate(event){}

  testFireBase(){
    // this.dataService.testFireBase()
    // .subscribe(data => {
    //   console.log('getting data from firebase');
    //   console.log(data);
    // },
    // err => {
    //   console.log(err);
    // });
  }

}
