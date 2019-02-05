import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.css']
})
export class QuestionnaireItemComponent implements OnInit {

  @Input()
  item: any;

  constructor() { }

  ngOnInit() {
  }

  remove(str: String) {
    if (str === undefined) return "";

    return str.replace('http://hl7.org/fhir/StructureDefinition/questionnaire-', '');
  }


}
