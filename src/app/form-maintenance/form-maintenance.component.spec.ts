import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMaintenanceComponent } from './form-maintenance.component';

describe('FormMaintenanceComponent', () => {
  let component: FormMaintenanceComponent;
  let fixture: ComponentFixture<FormMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
