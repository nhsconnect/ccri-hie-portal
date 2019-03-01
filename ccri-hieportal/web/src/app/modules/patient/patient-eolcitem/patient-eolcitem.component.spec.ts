import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEOLCItemComponent } from './patient-eolcitem.component';

describe('PatientEOLCItemComponent', () => {
  let component: PatientEOLCItemComponent;
  let fixture: ComponentFixture<PatientEOLCItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientEOLCItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEOLCItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
