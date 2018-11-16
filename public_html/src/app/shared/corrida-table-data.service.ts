import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject  } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CabidaTableDataService {

  types = {
    PRIDPTOS: 'PRIDPTOS',
    PRIDPTOSTOTAL:'PRIDPTOSTOTAL',
    TIPDPTOS: 'TIPDPTOS',
    TIPDPTOSTOTAL: 'TIPDPTOSTOTAL',
    TERDPTOS: 'TERDPTOS',
    TERDPTOSTOTAL: 'TERDPTOSTOTAL',
    TOTAL: 'TOTAL',
    COCHERAS: 'COCHERAS',
    SOTANOS: 'SOTANOS',
    VENTAS: 'VENTAS'
  };

  test = 'TEST';

  // receivedData  = new BehaviorSubject<{tipo: any, res: any[]}>([]);
  receivedData  = new BehaviorSubject<any>([]);
  showTerraceTable = new Subject<boolean>();
  showLastFloorTable = new Subject<boolean>();

  getCabidaTablesUrl = 'http://localhost:8000/corrida/getCabidaTables';
  // getCabidaTablesUrl = 'http://188.166.23.50:8000/corrida/getCabidaTables';





  constructor(private http: HttpClient){}

  // findLessons(
  //   courseId:number, filter = '', sortOrder = 'asc',
  //   pageNumber = 0, pageSize = 3):  Observable<Lesson[]> {
  //
  //   return this.http.get('/api/lessons', {
  //       params: new HttpParams()
  //           .set('courseId', courseId.toString())
  //           .set('filter', filter)
  //           .set('sortOrder', sortOrder)
  //           .set('pageNumber', pageNumber.toString())
  //           .set('pageSize', pageSize.toString())
  //   }).pipe(
  //       map(res =>  res["payload"])
  //   );
  // }


  getCabidaTableData(formValues: string, tableType: string){
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'}),
      params: new HttpParams().set('type', tableType)
      };
    return this.http.post<string>(this.getCabidaTablesUrl, formValues, httpOptions);
    // .pipe(
    //     map(res =>{
    //       console.log('The response for table values : ');
    //       console.log(res);
    //       console.log('The response in res[payload] : ');
    //       console.log(res["payload"]);
    //       res["payload"]
    //     })
    // );
  }



}

@Injectable({ providedIn: 'root' })
export class CorridaTableDataService {
  types = {
    DIRECTOS: 'DIRECTOS',
    INDIRECTOS: 'INDIRECTOS',
    COSTOSTOTALES: 'COSTOSTOTALES',
    UTILIDAD: 'UTILIDAD',
    GESTION: 'GESTION'
  };

  receivedData  = new BehaviorSubject<any>([]);
  getCorridaTablesUrl = 'http://localhost:8000/corrida/getCorridaTables';

  constructor(private http: HttpClient){}

  getCorridaTableData(formValues: string, tableType: string){
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'}),
      params: new HttpParams().set('type', tableType)
      };
    return this.http.post<string>(this.getCorridaTablesUrl, formValues, httpOptions);
    // .pipe(
    //     map(res =>{
    //       console.log('The response for table values : ');
    //       console.log(res);
    //       console.log('The response in res[payload] : ');
    //       console.log(res["payload"]);
    //       res["payload"]
    //     })
    // );
  }
}

@Injectable({ providedIn: 'root' })
export class TableDataService {

  tableToShow = new Subject<any>();

  constructor(){}

}
