import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionMgmtSystemComponent } from './election-mgmt-system.component';

describe('ElectionMgmtSystemComponent', () => {
  let component: ElectionMgmtSystemComponent;
  let fixture: ComponentFixture<ElectionMgmtSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionMgmtSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionMgmtSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
