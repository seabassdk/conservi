import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CorridaTableDataSource } from './corrida-table-datasource';
import { FormGroup } from '@angular/forms';

import { CorridaTableDataService } from '../../../../shared/corrida-table-data.service';

@Component({
  selector: 'app-corrida-table',
  templateUrl: './corrida-table.component.html',
  styleUrls: ['./corrida-table.component.css']
})
export class CorridaTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() displayedColumns: string[];
  @Input() tableType: string;
  @Input() proyectoForm: FormGroup;

  dataSource: CorridaTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */


  constructor(private dataService: CorridaTableDataService){}
  ngOnInit() {
    console.log(this.tableType);
    // formValues = this.cabida.getRawValue();
    // let serializedForm = JSON.stringify(formValues);
    this.dataSource = new CorridaTableDataSource(this.dataService, this.tableType);
    this.dataSource.loadCabidaData();

    console.log('Initializing for table type: ' + this.tableType);
    this.dataService.getCorridaTableData(this.proyectoForm.getRawValue(), this.tableType)
    .subscribe(res => {
                this.dataService.receivedData.next(
                              {tipo: this.tableType,
                              data: res}
                            );
                },
                err => {

                });
  }
}
