import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleEmployeeComponent } from './settle-employee.component';

describe('SettleEmployeeComponent', () => {
  let component: SettleEmployeeComponent;
  let fixture: ComponentFixture<SettleEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettleEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettleEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
