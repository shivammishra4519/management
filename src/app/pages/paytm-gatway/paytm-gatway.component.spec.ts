import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytmGatwayComponent } from './paytm-gatway.component';

describe('PaytmGatwayComponent', () => {
  let component: PaytmGatwayComponent;
  let fixture: ComponentFixture<PaytmGatwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaytmGatwayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaytmGatwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
