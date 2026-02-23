import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSurveillantComponent } from './dashboard-surveillant.component';

describe('DashboardSurveillantComponent', () => {
  let component: DashboardSurveillantComponent;
  let fixture: ComponentFixture<DashboardSurveillantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardSurveillantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardSurveillantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
