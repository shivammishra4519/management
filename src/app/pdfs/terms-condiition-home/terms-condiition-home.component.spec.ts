import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsCondiitionHomeComponent } from './terms-condiition-home.component';

describe('TermsCondiitionHomeComponent', () => {
  let component: TermsCondiitionHomeComponent;
  let fixture: ComponentFixture<TermsCondiitionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermsCondiitionHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsCondiitionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
