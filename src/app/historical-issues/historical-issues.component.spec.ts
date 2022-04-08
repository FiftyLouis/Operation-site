import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalIssuesComponent } from './historical-issues.component';

describe('HistoricalIssuesComponent', () => {
  let component: HistoricalIssuesComponent;
  let fixture: ComponentFixture<HistoricalIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalIssuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
