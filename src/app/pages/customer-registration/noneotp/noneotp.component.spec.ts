import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoneotpComponent } from './noneotp.component';

describe('NoneotpComponent', () => {
  let component: NoneotpComponent;
  let fixture: ComponentFixture<NoneotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoneotpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoneotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
