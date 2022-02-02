import { EmployeeServiceService } from './../employee-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeData } from '../employee.interface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  providers: [MessageService],
})
export class EmployeeFormComponent implements OnInit {

  employeeFrom!: FormGroup;
  editMode!: boolean;
  ref!: DynamicDialogRef;
  loader:boolean = true;


  get employeeFirstName() {
    return this.employeeFrom.get('employeeFirstName');
  }
  get employeeLastName() {
    return this.employeeFrom.get('employeeLastName');
  }
  get employeeEmail() {
    return this.employeeFrom.get('employeeEmail');
  }
  get employeePhone() {
    return this.employeeFrom.get('employeePhone');
  }

  constructor(private fb: FormBuilder, private http: HttpClient,
     private _mainService: EmployeeServiceService,    private primengConfig: PrimeNGConfig,
     private messageService: MessageService ) { }

  ngOnInit(): void {
    this.employeeFrom = this._mainService.employeeFrom;
    this.editMode = this._mainService.editMode;
    this.primengConfig.ripple = true;
  }

  /** Add and Edit data in the table
   * @param none
   * @returns void.
   *   */
  onAddEditTableRow() : void {
    if (this.editMode) {
      let value = parseInt(this._mainService.editIndex) + 1;
      if (this.employeeFrom.valid) {
        this.http.put('http://localhost:3000/employee/' + value + '', this.employeeFrom.value)
          .subscribe();
        this.loader = false;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Successful Edit'})
        window.location.reload();
      }
    }
    else {
      if (this.employeeFrom.valid) {
        this.http.post<EmployeeData>(`http://localhost:3000/employee`, this.employeeFrom.value)
          .subscribe();
        this.loader = false;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Successful Add'})
        window.location.reload();
      }   
    }
    this.employeeFrom.markAllAsTouched();
  }


}
