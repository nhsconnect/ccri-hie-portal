import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.css']
})
export class QuestionnaireItemComponent implements OnInit {

  @Input()
  item: any;

  @Input()
  depth;

  disabled: boolean = false;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getIcon(item) {
    switch(item.type) {
      case 'group':
        return 'group';
      case 'reference':
        return 'book';
      case 'choice':
        return 'question_answer';
      case 'string':
        return 'input';
    }
    return 'group';
  }
  getStyle(item) {
    return this._sanitizer.bypassSecurityTrustStyle('{background-color: accent;}');
  }

  remove(str: String) {
    if (str === undefined) return "";

    return str.replace('http://hl7.org/fhir/StructureDefinition/questionnaire-', '');
  }


}
