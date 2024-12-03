import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSettingsService } from './data-settings.service';
import { LoginService } from '../../login/login.service';

export interface PeriodicElement {
  username: string;
  id: number;
  password: string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    username: '@Smart_coder11',
    email: 'smongare2003@gmail.com',
    password: '******',
  },
];

@Component({
    selector: 'diary-data-settings',
    imports: [CdkTableModule],
    templateUrl: './data-settings.component.html',
    styleUrl: './data-settings.component.scss'
})
export class DataSettingsComponent implements OnInit {
  constructor(
    private dataSettingService: DataSettingsService,
    private loginService: LoginService
  ) {}

  displayedColumns: string[] = ['id', 'username', 'email', 'password'];
  dataSource = new ExampleDataSource();
  ngOnInit(): void {
    this.dataSettingService
      .get_userdata({ username: this.loginService.get_name_of_user })
      .pipe(
        tap((resp) => {
          console.log(resp);
          let transform_data: PeriodicElement[] = [
            {
              id: 1,
              username: resp.username,
              email: resp.email,
              password: '****',
            },
          ];
          this.dataSource.updateData(transform_data);
        }),
        catchError((error) => {
          console.error('Failed to fetch data: ', error);
          return EMPTY;
        })
      )
      .subscribe();
  }
}

export class ExampleDataSource extends DataSource<PeriodicElement> {
  /** Stream of data that is provided to the table. */
  private dataSubject = new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PeriodicElement[]> {
    return this.dataSubject.asObservable();
  }

  disconnect() {}

  updateData(newData: PeriodicElement[]): void {
    this.dataSubject.next(newData);
  }
}
