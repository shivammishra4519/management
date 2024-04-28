import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorConditionComponent } from './guarantor-condition.component';

describe('GuarantorConditionComponent', () => {
  let component: GuarantorConditionComponent;
  let fixture: ComponentFixture<GuarantorConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuarantorConditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuarantorConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
