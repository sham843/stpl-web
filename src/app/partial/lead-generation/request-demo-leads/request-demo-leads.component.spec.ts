import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDemoLeadsComponent } from './request-demo-leads.component';

describe('RequestDemoLeadsComponent', () => {
  let component: RequestDemoLeadsComponent;
  let fixture: ComponentFixture<RequestDemoLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDemoLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDemoLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
