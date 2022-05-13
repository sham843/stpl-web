import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRejectedApplicationsComponent } from './approved-rejected-applications.component';

describe('ApprovedRejectedApplicationsComponent', () => {
  let component: ApprovedRejectedApplicationsComponent;
  let fixture: ComponentFixture<ApprovedRejectedApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedRejectedApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedRejectedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
