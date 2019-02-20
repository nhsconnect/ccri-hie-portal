import { Component, OnInit } from '@angular/core';

import {FhirService} from '../../../service/fhir.service';
import {ActivatedRoute} from '@angular/router';
import {BundleService} from '../../../service/bundle.service';

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
      code: 'CPR',
      name: 'CPR Status'
    },
    {
      code: 'ATP',
      name: 'Advanced Treatment Preferences' },
    {
      code: 'PREF',
      name: 'Preferences'
    },
    {
      code: 'PRO',
      name: 'Prognosis'
    },
    {
      code: 'DOC',
      name: 'Other Documents'
    }, // Contacts- this is part of Patient
    {
      code: 'LPA',
      name: 'Lasting Power Of Attorney'
    },
    {
      code: 'FUN',
      name: 'Functional Status'
    },
    {
      code: 'DIS',
      name: 'Disability'
    },
    {
      code: 'CON',
      name: 'Consent'
    },
    {
      code: 'EOL',
      name: 'End Of Life Care'
    }
    ]


  constructor(private fhirService: FhirService,
              private route: ActivatedRoute,
              private bundleService: BundleService) { }

  ngOnInit() {

    this.patientid = this.route.snapshot.paramMap.get('patientid');

    this.fhirService.get('/QuestionnaireResponse?patient=' + this.patientid +
     '&questionnaire:identifier=https://fhir.nhs.uk/STU3/Questionnaire%7CCareConnect-EOLC-1&_include=*&_count=100').subscribe(bundle => {

      if (bundle.entry !== undefined) {
        this.bundleService.setBundle(bundle);
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
