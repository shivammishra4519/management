import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundTranseferDetaillsComponent } from './fund-transefer-detaills.component';

describe('FundTranseferDetaillsComponent', () => {
  let component: FundTranseferDetaillsComponent;
  let fixture: ComponentFixture<FundTranseferDetaillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FundTranseferDetaillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundTranseferDetaillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
