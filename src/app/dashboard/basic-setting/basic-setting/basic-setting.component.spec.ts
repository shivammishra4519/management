import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSettingComponent } from './basic-setting.component';

describe('BasicSettingComponent', () => {
  let component: BasicSettingComponent;
  let fixture: ComponentFixture<BasicSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
