import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermscondtionComponent } from './termscondtion.component';

describe('TermscondtionComponent', () => {
  let component: TermscondtionComponent;
  let fixture: ComponentFixture<TermscondtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermscondtionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermscondtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
