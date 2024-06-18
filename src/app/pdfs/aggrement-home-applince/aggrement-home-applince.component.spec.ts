import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrementHomeApplinceComponent } from './aggrement-home-applince.component';

describe('AggrementHomeApplinceComponent', () => {
  let component: AggrementHomeApplinceComponent;
  let fixture: ComponentFixture<AggrementHomeApplinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggrementHomeApplinceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AggrementHomeApplinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
