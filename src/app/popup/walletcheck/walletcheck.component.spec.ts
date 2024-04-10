import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletcheckComponent } from './walletcheck.component';

describe('WalletcheckComponent', () => {
  let component: WalletcheckComponent;
  let fixture: ComponentFixture<WalletcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletcheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
