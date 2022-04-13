import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalMaintenanceComponent } from './historical-maintenance.component';

describe('HistoricalMaintenanceComponent', () => {
  let component: HistoricalMaintenanceComponent;
  let fixture: ComponentFixture<HistoricalMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
