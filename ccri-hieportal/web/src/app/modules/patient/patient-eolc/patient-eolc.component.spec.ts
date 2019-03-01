import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEOLCComponent } from './patient-eolc.component';

describe('PatientEOLCComponent', () => {
  let component: PatientEOLCComponent;
  let fixture: ComponentFixture<PatientEOLCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientEOLCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEOLCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
