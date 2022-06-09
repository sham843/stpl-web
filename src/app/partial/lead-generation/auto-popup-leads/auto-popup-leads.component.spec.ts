import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoPopupLeadsComponent } from './auto-popup-leads.component';

describe('AutoPopupLeadsComponent', () => {
  let component: AutoPopupLeadsComponent;
  let fixture: ComponentFixture<AutoPopupLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoPopupLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoPopupLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
