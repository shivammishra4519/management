import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EminotpaidComponent } from './eminotpaid.component';

describe('EminotpaidComponent', () => {
  let component: EminotpaidComponent;
  let fixture: ComponentFixture<EminotpaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EminotpaidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EminotpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
