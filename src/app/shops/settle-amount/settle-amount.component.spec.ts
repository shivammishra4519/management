import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleAmountComponent } from './settle-amount.component';

describe('SettleAmountComponent', () => {
  let component: SettleAmountComponent;
  let fixture: ComponentFixture<SettleAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettleAmountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettleAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
