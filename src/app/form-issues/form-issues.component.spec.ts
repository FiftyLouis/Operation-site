import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIssuesComponent } from './form-issues.component';

describe('FormIssuesComponent', () => {
  let component: FormIssuesComponent;
  let fixture: ComponentFixture<FormIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIssuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
