import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleBankComponent } from './settle-bank.component';

describe('SettleBankComponent', () => {
  let component: SettleBankComponent;
  let fixture: ComponentFixture<SettleBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettleBankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettleBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
