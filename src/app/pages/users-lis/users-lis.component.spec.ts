import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLisComponent } from './users-lis.component';

describe('UsersLisComponent', () => {
  let component: UsersLisComponent;
  let fixture: ComponentFixture<UsersLisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersLisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
