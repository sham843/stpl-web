import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MahaminingSystemComponent } from './mahamining-system.component';

describe('MahaminingSystemComponent', () => {
  let component: MahaminingSystemComponent;
  let fixture: ComponentFixture<MahaminingSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MahaminingSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MahaminingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
