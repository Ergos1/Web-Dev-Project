import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffToolsComponent } from './staff-tools.component';

describe('StaffToolsComponent', () => {
  let component: StaffToolsComponent;
  let fixture: ComponentFixture<StaffToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
