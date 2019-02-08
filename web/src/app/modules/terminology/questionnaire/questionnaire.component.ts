import { Component, OnInit } from '@angular/core';
import {FhirService} from '../../../service/fhir.service';
import {AppConfigService} from '../../../service/app-config.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})


export class QuestionnaireComponent implements OnInit {

  questionnaire: fhir.Questionnaire;
  constructor(private appConfig: AppConfigService, private fhirService: FhirService) { }

  ngOnInit() {




    this.getQuestionnaire();

  }

  getQuestionnaire() {
    this.fhirService.get('/Questionnaire?identifier=https://fhir.nhs.uk/STU3/Questionnaire%7CCareConnect-EOLC-1').subscribe(
      result => {
        const bundle: fhir.Bundle = result;
        if (bundle.total > 0) {
          for (const entry of bundle.entry) {
            if (entry.resource.resourceType === 'Questionnaire') {
              console.log('Got Questionnaire');
              this.questionnaire = <fhir.Questionnaire> entry.resource;
            }
          }
        }
      }
    );
  }
}
