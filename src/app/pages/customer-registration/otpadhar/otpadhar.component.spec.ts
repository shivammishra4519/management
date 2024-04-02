import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpadharComponent } from './otpadhar.component';

describe('OtpadharComponent', () => {
  let component: OtpadharComponent;
  let fixture: ComponentFixture<OtpadharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpadharComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtpadharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
