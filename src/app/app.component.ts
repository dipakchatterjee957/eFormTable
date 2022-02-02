import { EmployeeServiceService } from './employee-service.service';
import { HttpClient } from '@angular/common/http';
import { EmployeeData } from './employee.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DialogService, ConfirmationService],
})
export class AppComponent implements OnInit {
  title = 'eFormTable';
  employees: EmployeeData[] = [];
  ref!: DynamicDialogRef;
  msgs: Message[] = [];
  employeeFrom!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogService: DialogService,
    private _mainService: EmployeeServiceService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.onget();
    this.employeeFrom = this._mainService.employeeFrom;
  }

  /** Show and hide the form pop-up
   * @param none
   * @returns void.
   *   */
  showForm(): void {
    this._mainService.employeeFrom.reset();
    this._mainService.editMode = false;
    this.ref = this.dialogService.open(EmployeeFormComponent, {
      header: 'Employee Form',
      width: '70%',
      height: '75%',
      dismissableMask: true,
    });
  }

  /** Get the value of a employee
   * @param none
   * @returns void.
   *   */
  onget(): void {
    this.http
      .get<EmployeeData>('http://localhost:3000/employee')
      .pipe(
        map((empData: any) => {
          const employeeArray: any[] = [];
          for (const key in empData) {
            if (empData.hasOwnProperty(key)) {
              employeeArray.push({ employeeId: key, ...empData[key] });
            }
          }
          console.log(employeeArray);
          return employeeArray;
        })
      )
      .subscribe((response: any) => (this.employees = response));
  }

  /** View table data of Individual Employee
   * @param item: any
   * @returns void.
   *   */
  viewData(item: any): void {
    this._mainService.populateForm(item);
    this._mainService.editMode = true;
    this.ref = this.dialogService.open(EmployeeFormComponent, {
      header: `${
        this.employees[item].employeeFirstName +
        ' ' +
        this.employees[item].employeeLastName
      }`,
      width: '70%',
      height: '75%',
      dismissableMask: true,
    });
  }

  /** Delete employee table row
   * @param empId: number, item: any
   * @returns void.
   *   */
  delete(empId: number, item: any): void {
    this.confirmationService.confirm({
      message: `Do you want to delete ${this.employees[item].employeeFirstName} ?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [
          { severity: 'info', summary: 'Confirmed', detail: 'Record deleted' },
        ];
        this.http
          .delete('http://localhost:3000/employee/' + empId + '')
          .subscribe(() => this.onget());
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Rejected',
            detail: 'You have rejected',
          },
        ];
      },
    });
  }
}
