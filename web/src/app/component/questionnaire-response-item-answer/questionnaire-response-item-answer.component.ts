import {Component, Input, OnInit} from '@angular/core';
import {BundleService} from '../../service/bundle.service';

@Component({
  selector: 'app-questionnaire-response-item-answer',
  templateUrl: './questionnaire-response-item-answer.component.html',
  styleUrls: ['./questionnaire-response-item-answer.component.css']
})
export class QuestionnaireResponseItemAnswerComponent implements OnInit {

  @Input()
  answer: fhir.QuestionnaireResponseItemAnswer;

  resource: any;

  constructor(
    private bundleService: BundleService
  ) { }

  ngOnInit() {
    this.resource = this.getResource(this.answer.valueReference.reference);
  }

  public getResource(reference: string): fhir.Resource {

    for(const entry of this.bundleService.getBundle().entry) {

      if (entry.fullUrl.endsWith(reference)) {
        //console.log(entry.fullUrl);
        return entry.resource;
      }
    }
    return undefined;

  }

}
