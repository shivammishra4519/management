import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaurntorSelfComponent } from './gaurntor-self.component';

describe('GaurntorSelfComponent', () => {
  let component: GaurntorSelfComponent;
  let fixture: ComponentFixture<GaurntorSelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GaurntorSelfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GaurntorSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
