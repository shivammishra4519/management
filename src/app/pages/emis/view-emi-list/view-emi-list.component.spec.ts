import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmiListComponent } from './view-emi-list.component';

describe('ViewEmiListComponent', () => {
  let component: ViewEmiListComponent;
  let fixture: ComponentFixture<ViewEmiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEmiListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewEmiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
