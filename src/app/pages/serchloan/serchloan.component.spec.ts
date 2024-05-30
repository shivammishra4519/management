import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchloanComponent } from './serchloan.component';

describe('SerchloanComponent', () => {
  let component: SerchloanComponent;
  let fixture: ComponentFixture<SerchloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SerchloanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerchloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
