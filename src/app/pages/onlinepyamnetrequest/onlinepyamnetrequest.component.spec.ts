import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinepyamnetrequestComponent } from './onlinepyamnetrequest.component';

describe('OnlinepyamnetrequestComponent', () => {
  let component: OnlinepyamnetrequestComponent;
  let fixture: ComponentFixture<OnlinepyamnetrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnlinepyamnetrequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnlinepyamnetrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
