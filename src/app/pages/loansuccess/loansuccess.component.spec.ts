import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansuccessComponent } from './loansuccess.component';

describe('LoansuccessComponent', () => {
  let component: LoansuccessComponent;
  let fixture: ComponentFixture<LoansuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoansuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoansuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
