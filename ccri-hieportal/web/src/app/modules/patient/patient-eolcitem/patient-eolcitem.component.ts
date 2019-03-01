import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-patient-eolcitem',
  templateUrl: './patient-eolcitem.component.html',
  styleUrls: ['./patient-eolcitem.component.css']
})
export class PatientEOLCItemComponent implements OnInit {

  @Input()
  form: fhir.QuestionnaireResponse;

  @Input()
  unit: any;

  constructor() { }

  ngOnInit() {
  }

}
