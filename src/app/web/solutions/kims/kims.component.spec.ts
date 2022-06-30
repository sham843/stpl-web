import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KimsComponent } from './kims.component';

describe('KimsComponent', () => {
  let component: KimsComponent;
  let fixture: ComponentFixture<KimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
