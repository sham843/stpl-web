import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DairyVetSoftwareComponent } from './dairy-vet-software.component';

describe('DairyVetSoftwareComponent', () => {
  let component: DairyVetSoftwareComponent;
  let fixture: ComponentFixture<DairyVetSoftwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DairyVetSoftwareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DairyVetSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
