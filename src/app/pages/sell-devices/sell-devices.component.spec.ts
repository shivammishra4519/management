import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellDevicesComponent } from './sell-devices.component';

describe('SellDevicesComponent', () => {
  let component: SellDevicesComponent;
  let fixture: ComponentFixture<SellDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellDevicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
