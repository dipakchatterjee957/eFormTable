import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  employees: any[] = [];
  editIndex!: string;
  editMode: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  employeeFrom: FormGroup = this.fb.group({
    employeeFirstName: [null, Validators.required],
    employeeLastName: [null, Validators.required],
    employeeEmail: [null, [Validators.required, Validators.email]],
    employeePhone: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    employeeAdd1: [null],
    employeeAdd2: [null]
  })

/** Populate table data to form
   * @param item: any
   * @returns void.
   *   */
  populateForm(item: any) : void{
    this.http.get('http://localhost:3000/employee')
      .pipe(map((empData: any) => {
        const employeeArray: any[] = [];
        for (const key in empData) {
          if (empData.hasOwnProperty(key)) {
            employeeArray.push({ employeeId: key, ...empData[key] })
          }
        }
        console.log(employeeArray);
        return employeeArray;
      }))
      .subscribe((response: any) => {
         this.employees = response;
        this.editIndex = this.employees[item].employeeId;
        this.employeeFrom.patchValue({
          employeeFirstName: (this.employees[item].employeeFirstName),
          employeeLastName: (this.employees[item].employeeLastName),
          employeeEmail: (this.employees[item].employeeEmail),
          employeePhone: (this.employees[item].employeePhone),
          employeeAdd1: (this.employees[item].employeeAdd1),
          employeeAdd2: (this.employees[item].employeeAdd2)
        })
      })

  }
}
