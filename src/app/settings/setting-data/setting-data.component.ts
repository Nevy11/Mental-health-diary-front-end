import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AppTimetableDataSource, AppTimetableItem } from './setting-data';

@Component({
  selector: 'diary-setting-data',
  standalone: true,
  imports: [MatTable, MatSort, MatPaginator],
  templateUrl: './setting-data.component.html',
  styleUrl: './setting-data.component.scss',
})
export class SettingDataComponent {
  username: string = '@smart_coder';
  email: string = 'smongare2003@gmail.com';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AppTimetableItem>;
  dataSource = new AppTimetableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
