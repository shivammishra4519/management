import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleCollectionComponent } from './settle-collection.component';

describe('SettleCollectionComponent', () => {
  let component: SettleCollectionComponent;
  let fixture: ComponentFixture<SettleCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettleCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettleCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
