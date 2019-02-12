import { Component, OnInit } from '@angular/core';

import {FhirService} from '../../../service/fhir.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-patient-eolc',
  templateUrl: './patient-eolc.component.html',
  styleUrls: ['./patient-eolc.component.css']
})
export class PatientEOLCComponent implements OnInit {

  form: fhir.QuestionnaireResponse;

  patientid;

  units: any[] = [
    {
      code: 'ATP',
      name: 'Advanced Treatment Preferences' },
    {
      code: 'CON',
      name: 'Consent'
    },
    {
      code: 'CPR',
      name: 'CPR Status'
    },
    {
      code: 'DIS',
      name: 'Disability'
    },
    {
      code: 'DOC',
      name: 'Other Documents'
    },
    {
      code: 'EOL',
      name: 'End Of Life Care'
    },
    {
      code: 'FUN',
      name: 'Functional Status'
    },
    {
      code: 'LPA',
      name: 'Lasting Power Of Attorney'
    },
    {
      code: 'PREF',
      name: 'Preferences'
    },
    {
      code: 'PRO',
      name: 'Prognosis'
    }]


  constructor(private fhirService: FhirService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.patientid = this.route.snapshot.paramMap.get('patientid');

    this.fhirService.get('/QuestionnaireResponse?patient=' + this.patientid +
     '&questionnaire:identifier=https://fhir.nhs.uk/STU3/Questionnaire%7CCareConnect-EOLC-1&_include=*&_count=100').subscribe(bundle => {

      if (bundle.entry !== undefined) {
        for (const entry of bundle.entry) {
          switch (entry.resource.resourceType) {
            case 'QuestionnaireResponse' :
              this.form = <fhir.QuestionnaireResponse> entry.resource;
              break;
          }
        }
      }
    });
  }

}
