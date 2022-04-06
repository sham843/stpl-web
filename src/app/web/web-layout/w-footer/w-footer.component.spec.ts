import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WFooterComponent } from './w-footer.component';

describe('WFooterComponent', () => {
  let component: WFooterComponent;
  let fixture: ComponentFixture<WFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
