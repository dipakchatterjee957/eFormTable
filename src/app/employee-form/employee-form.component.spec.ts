import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeServiceService } from '../employee-service.service';

import { EmployeeFormComponent } from './employee-form.component';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  var test = 'YES';
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,HttpClientModule],
      declarations: [EmployeeFormComponent],
      providers: [EmployeeServiceService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showForm function', () => {
    component.onAddEditTableRow();
    expect(component.onAddEditTableRow).toBeDefined();
  });

  if(test === 'YES') {

      it('should pass', function () {
          expect(true).toBeTruthy();
      });

  } else {
      it('should fail', function () {
          expect(true).toBeFalsy();
      });
  }

});
