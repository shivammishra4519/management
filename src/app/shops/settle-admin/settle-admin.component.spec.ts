import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleAdminComponent } from './settle-admin.component';

describe('SettleAdminComponent', () => {
  let component: SettleAdminComponent;
  let fixture: ComponentFixture<SettleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettleAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
