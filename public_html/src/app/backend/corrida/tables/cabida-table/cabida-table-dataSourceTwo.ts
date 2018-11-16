import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';


import { CabidaTableDataService } from '../../../../shared/corrida-table-data.service';

export class CabidaTableDataSource implements DataSource<any> {

    private cabidaTableItemSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private dataService: CabidaTableDataService, private tableType:string ) {}

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.cabidaTableItemSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.cabidaTableItemSubject.complete();
        this.loadingSubject.complete();
    }

    loadCabidaData(){
      this.dataService.receivedData.subscribe(
        (res) => {
          if( res.tipo === this.tableType){
            this.cabidaTableItemSubject.next(res.data);
            if(res.tipo === 'TERDPTOS' || res.tipo === 'TERDPTOSTOTAL'){
              this.dataService.showTerraceTable.next(true);
            }
          }
        }
      );

    // loadLessons(courseId: number, filter = '',
    //             sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

        // this.loadingSubject.next(true);
        //
        // this.coursesService.findLessons(courseId, filter, sortDirection,
        //     pageIndex, pageSize).pipe(
        //     catchError(() => of([])),
        //     finalize(() => this.loadingSubject.next(false))
        // )
        // .subscribe(lessons => this.lessonsSubject.next(lessons));
     }
}
