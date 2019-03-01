import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireResponseItemAnswerComponent } from './questionnaire-response-item-answer.component';

describe('QuestionnaireResponseItemAnswerComponent', () => {
  let component: QuestionnaireResponseItemAnswerComponent;
  let fixture: ComponentFixture<QuestionnaireResponseItemAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireResponseItemAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireResponseItemAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
