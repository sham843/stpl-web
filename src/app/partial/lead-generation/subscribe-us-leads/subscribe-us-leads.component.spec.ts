import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeUsLeadsComponent } from './subscribe-us-leads.component';

describe('SubscribeUsLeadsComponent', () => {
  let component: SubscribeUsLeadsComponent;
  let fixture: ComponentFixture<SubscribeUsLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribeUsLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeUsLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
