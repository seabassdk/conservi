import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { FormGroup } from '@angular/forms';

// import { CabidaTableDataSource } from './cabida-table-datasource';
import { CabidaTableDataSource } from './cabida-table-datasourceTwo';

import { CabidaTableItem } from '../../model/CabidaTableItem';
import { CabidaTableDataService } from '../../../../shared/corrida-table-data.service';

@Component({
  selector: 'app-cabida-table',
  templateUrl: './cabida-table.component.html',
  styleUrls: ['./cabida-table.component.css']
})
export class CabidaTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() displayedColumns: string[];
  @Input() tableType: string;
  @Input() cabida: FormGroup;
  @Input() proyectoForm: FormGroup;

  dataSource: CabidaTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */


  constructor(private dataService: CabidaTableDataService){}
  ngOnInit() {
    // formValues = this.cabida.getRawValue();
    // let serializedForm = JSON.stringify(formValues);
    this.dataSource = new CabidaTableDataSource(this.dataService, this.tableType);
    this.dataSource.loadCabidaData();
    this.dataService.getCabidaTableData(this.proyectoForm.getRawValue(), this.tableType)
    .subscribe(res => {
                this.dataService.receivedData.next(
                              {tipo: this.tableType,
                              data: res}
                            );
                },
                err => {
                  if(this.tableType === 'TERDPTOS' || this.tableType === 'TERDPTOSTOTAL'){
                    this.dataService.showTerraceTable.next(false);
                  }
                });
  }
}
