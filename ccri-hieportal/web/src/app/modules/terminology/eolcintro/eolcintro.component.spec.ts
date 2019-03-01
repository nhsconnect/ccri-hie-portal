import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EOLCIntroComponent } from './eolcintro.component';

describe('EOLCIntroComponent', () => {
  let component: EOLCIntroComponent;
  let fixture: ComponentFixture<EOLCIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EOLCIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOLCIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
