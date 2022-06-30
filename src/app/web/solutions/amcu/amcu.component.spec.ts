import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcuComponent } from './amcu.component';

describe('AmcuComponent', () => {
  let component: AmcuComponent;
  let fixture: ComponentFixture<AmcuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
