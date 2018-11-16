import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable  } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class CabidaDataService {

  cabidaUrl = 'http://localhost:8000/cabida';
  corridaInsertUrl = 'http://localhost:8000/corrida/insertCorrida';
  getCorridasUrl = 'http://localhost:8000/corrida/getCorridas';
  getCorridaUrl = 'http://localhost:8000/corrida/getCorrida';
  getCabidaTablesUrl = 'http://localhost:8000/corrida/getCabidaTables';

  // cabidaUrl = 'http://188.166.23.50:8000/cabida';
  // corridaInsertUrl = 'http://188.166.23.50:8000/corrida/insertCorrida';
  // getCorridasUrl = 'http://188.166.23.50:8000/corrida/getCorridas';
  // getCorridaUrl = 'http://188.166.23.50:8000/corrida/getCorrida';
  // getCabidaTablesUrl = 'http://188.166.23.50:8000/corrida/getCabidaTables';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient){}


  sendCorData(formValues: string): Observable<any>{
     return this.http.post<string>(this.corridaInsertUrl, formValues, this.httpOptions);
  }

  getData(): Observable<any>{
    return this.http.get<any>(this.getCorridasUrl);
    //console.log("Loggin from the service.");
  }

  getCorridas(): Observable<any>{
    return this.http.get<any>(this.getCorridasUrl);
  }

  getCorrida(id: string): Observable<any>{
    // var sendId = {id: id};
    // console.log('param id: ' + id)
    var params = new HttpParams().set('id', id);
    // params = params.append('id', id);

    return this.http.get<any>(this.getCorridaUrl, {params: params});
  }

  sendCabidaData(formValues: string){
    return this.http.post<string>(this.getCabidaTablesUrl, formValues, this.httpOptions);
  }




}
