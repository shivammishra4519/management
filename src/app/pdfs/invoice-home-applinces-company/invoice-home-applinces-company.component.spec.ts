import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceHomeApplincesCompanyComponent } from './invoice-home-applinces-company.component';

describe('InvoiceHomeApplincesCompanyComponent', () => {
  let component: InvoiceHomeApplincesCompanyComponent;
  let fixture: ComponentFixture<InvoiceHomeApplincesCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceHomeApplincesCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceHomeApplincesCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
