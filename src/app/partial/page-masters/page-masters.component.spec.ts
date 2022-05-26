import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMastersComponent } from './page-masters.component';

describe('PageMastersComponent', () => {
  let component: PageMastersComponent;
  let fixture: ComponentFixture<PageMastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMastersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
