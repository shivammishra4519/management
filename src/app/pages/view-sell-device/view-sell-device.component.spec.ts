import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSellDeviceComponent } from './view-sell-device.component';

describe('ViewSellDeviceComponent', () => {
  let component: ViewSellDeviceComponent;
  let fixture: ComponentFixture<ViewSellDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSellDeviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSellDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
