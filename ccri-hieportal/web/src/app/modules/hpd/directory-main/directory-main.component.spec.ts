import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryMainComponent } from './directory-main.component';

describe('DirectoryMainComponent', () => {
  let component: DirectoryMainComponent;
  let fixture: ComponentFixture<DirectoryMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoryMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
