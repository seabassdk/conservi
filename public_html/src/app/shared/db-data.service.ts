import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable  } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class DataService {

  dbUrl = 'http://localhost:8000/firebase';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient){}


  testFireBase(){
    return this.http.get<string>(this.dbUrl, this.httpOptions);
  }

}
