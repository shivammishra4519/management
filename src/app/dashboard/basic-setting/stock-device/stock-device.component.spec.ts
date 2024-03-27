import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDeviceComponent } from './stock-device.component';

describe('StockDeviceComponent', () => {
  let component: StockDeviceComponent;
  let fixture: ComponentFixture<StockDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockDeviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
