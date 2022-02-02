import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { of } from 'rxjs/internal/observable/of';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeServiceService } from './employee-service.service';
import { EmployeeData } from './employee.interface';

describe('AppComponent', () => {
  let app: any;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,BrowserAnimationsModule,AppRoutingModule,
        NgbModule, TableModule, ButtonModule, SplitButtonModule, ToastModule,OverlayPanelModule,
        InputTextareaModule, DynamicDialogModule, ConfirmDialogModule, MessagesModule,RippleModule,
        FormsModule, ReactiveFormsModule,
        HttpClientModule],
      declarations: [AppComponent, EmployeeFormComponent],
      providers: [EmployeeServiceService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('onget fuction', () => {
    expect(app.onget).toBeDefined();
  });

  it('ngOnInit', () => {
    app.ngOnInit();
    expect(app.ngOnInit).toBeDefined();
  });

  it('showForm function', () => {
    app.showForm();
    expect(app.showForm).toBeDefined();
  });

  it('test subscribe method', () => {
    let response: EmployeeData[] = [];
    spyOn(app,'onget').and.returnValue(of(response));
    app.onget();
    fixture.detectChanges();
    expect(app.employees).toEqual(response);
  });

});
