import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailIssueComponent } from './detail-issue.component';

describe('DetailIssueComponent', () => {
  let component: DetailIssueComponent;
  let fixture: ComponentFixture<DetailIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
