import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundTranseferComponent } from './fund-transefer.component';

describe('FundTranseferComponent', () => {
  let component: FundTranseferComponent;
  let fixture: ComponentFixture<FundTranseferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FundTranseferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundTranseferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
