import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { AppTimetableDataSource, AppTimetableItem } from './setting-data';
import { SettingDataService } from './setting-data.service';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'diary-setting-data',
  standalone: true,
  imports: [MatSort, MatPaginator, MatTableModule],
  templateUrl: './setting-data.component.html',
  styleUrl: './setting-data.component.scss',
})
export class SettingDataComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AppTimetableItem>;

  public name_user!: string;
  public email_user!: string;
  dataSource!: any;
  ngOnInit(): void {
    this.settingData
      .get_userdata({ username: this.loginService.get_name_of_user })
      .subscribe((resp) => {
        console.log(resp);
        this.name_user = resp.username;
        this.email_user = resp.email;
        this.dataSource = new AppTimetableDataSource(
          this.name_user,
          this.email_user
        );
      });
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'Value'];
  constructor(
    private settingData: SettingDataService,
    private loginService: LoginService
  ) {}

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
