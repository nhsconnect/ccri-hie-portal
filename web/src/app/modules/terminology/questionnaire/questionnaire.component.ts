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
    this.fhirService.getResource('/Questionnaire/10').subscribe(
      form => {
        console.log('Got Questionnaire');
        this.questionnaire = <fhir.Questionnaire> form;
      }
    );
  }
}
