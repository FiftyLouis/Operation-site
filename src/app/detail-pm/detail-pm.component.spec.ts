import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPmComponent } from './detail-pm.component';

describe('DetailPmComponent', () => {
  let component: DetailPmComponent;
  let fixture: ComponentFixture<DetailPmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
