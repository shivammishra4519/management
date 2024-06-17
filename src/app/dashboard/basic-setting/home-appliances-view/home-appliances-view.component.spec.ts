import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAppliancesViewComponent } from './home-appliances-view.component';

describe('HomeAppliancesViewComponent', () => {
  let component: HomeAppliancesViewComponent;
  let fixture: ComponentFixture<HomeAppliancesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeAppliancesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAppliancesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
