import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomersListComponent } from './view-customers-list.component';

describe('ViewCustomersListComponent', () => {
  let component: ViewCustomersListComponent;
  let fixture: ComponentFixture<ViewCustomersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCustomersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
