import { Component, OnInit } from '@angular/core';
import {FhirService} from '../../../service/fhir.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})


export class QuestionnaireComponent implements OnInit {

  questionnaire: fhir.Questionnaire;
  constructor(private fhirService: FhirService) { }

  ngOnInit() {
    this.fhirService.getResource('/Questionnaire/4').subscribe(
      form => {
        console.log('Got Questionnaire');
        this.questionnaire = <fhir.Questionnaire> form;
      }
    )
  }

}
