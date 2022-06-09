import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsLeadsComponent } from './contact-us-leads.component';

describe('ContactUsLeadsComponent', () => {
  let component: ContactUsLeadsComponent;
  let fixture: ComponentFixture<ContactUsLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
