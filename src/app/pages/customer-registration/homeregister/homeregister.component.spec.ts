import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeregisterComponent } from './homeregister.component';

describe('HomeregisterComponent', () => {
  let component: HomeregisterComponent;
  let fixture: ComponentFixture<HomeregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeregisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
