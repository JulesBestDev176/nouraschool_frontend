import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEleveComponent } from './dashboard-eleve.component';

describe('DashboardEleveComponent', () => {
  let component: DashboardEleveComponent;
  let fixture: ComponentFixture<DashboardEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardEleveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
