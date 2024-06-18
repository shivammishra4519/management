import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeApplincesSuccessComponent } from './home-applinces-success.component';

describe('HomeApplincesSuccessComponent', () => {
  let component: HomeApplincesSuccessComponent;
  let fixture: ComponentFixture<HomeApplincesSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeApplincesSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeApplincesSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
