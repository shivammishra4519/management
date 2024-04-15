import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentslipComponent } from './installmentslip.component';

describe('InstallmentslipComponent', () => {
  let component: InstallmentslipComponent;
  let fixture: ComponentFixture<InstallmentslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstallmentslipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstallmentslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
