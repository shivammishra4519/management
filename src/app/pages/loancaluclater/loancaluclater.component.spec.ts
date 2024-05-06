import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoancaluclaterComponent } from './loancaluclater.component';

describe('LoancaluclaterComponent', () => {
  let component: LoancaluclaterComponent;
  let fixture: ComponentFixture<LoancaluclaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoancaluclaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoancaluclaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
