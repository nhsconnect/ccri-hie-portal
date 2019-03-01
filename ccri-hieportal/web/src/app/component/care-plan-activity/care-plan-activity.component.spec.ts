import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanActivityComponent } from './care-plan-activity.component';

describe('CarePlanActivityComponent', () => {
  let component: CarePlanActivityComponent;
  let fixture: ComponentFixture<CarePlanActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarePlanActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
