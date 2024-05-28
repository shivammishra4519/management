import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewemiAdminComponent } from './viewemi-admin.component';

describe('ViewemiAdminComponent', () => {
  let component: ViewemiAdminComponent;
  let fixture: ComponentFixture<ViewemiAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewemiAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewemiAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
