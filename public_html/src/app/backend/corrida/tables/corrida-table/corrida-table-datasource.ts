import { DataSource, CollectionViewer  } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';

import { CorridaTableDataService } from '../../../../shared/corrida-table-data.service';

import { CabidaTableItem } from '../../model/CabidaTableItem';
/**
 * Data source for the CorridaTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CorridaTableDataSource implements DataSource<any> {
  private cabidaTableItemSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private dataService: CorridaTableDataService, private tableType:string ) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
      return this.cabidaTableItemSubject.asObservable();
  }



  loadCabidaData(){
    this.dataService.receivedData.subscribe(
      (res) => {
        if( res.tipo === this.tableType){
          this.cabidaTableItemSubject.next(res.data);
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
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
   disconnect(collectionViewer: CollectionViewer): void {
       this.cabidaTableItemSubject.complete();
       this.loadingSubject.complete();
   }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getPagedData(data: CorridaTableItem[]) {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   return data.splice(startIndex, this.paginator.pageSize);
  // }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getSortedData(data: CorridaTableItem[]) {
  //   if (!this.sort.active || this.sort.direction === '') {
  //     return data;
  //   }
  //
  //   return data.sort((a, b) => {
  //     const isAsc = this.sort.direction === 'asc';
  //     switch (this.sort.active) {
  //       case 'name': return compare(a.name, b.name, isAsc);
  //       case 'id': return compare(+a.id, +b.id, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
