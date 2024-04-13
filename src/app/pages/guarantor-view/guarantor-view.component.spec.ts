import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorViewComponent } from './guarantor-view.component';

describe('GuarantorViewComponent', () => {
  let component: GuarantorViewComponent;
  let fixture: ComponentFixture<GuarantorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuarantorViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuarantorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
