import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-questionnaire-response-item',
  templateUrl: './questionnaire-response-item.component.html',
  styleUrls: ['./questionnaire-response-item.component.css']
})
export class QuestionnaireResponseItemComponent implements OnInit {

  @Input()
  item: fhir.QuestionnaireResponseItem = undefined;

  @Input()
  depth;

 // items: MatTableDataSource<any> = undefined;
 // displayedColumns: string[] = ['question', 'answer'];
  constructor() { }

  ngOnInit() {
   //   this.items = new MatTableDataSource<any> ([ this.item ] );
  }

  getLeft() {
    const left = 40 - (5 * this.depth);
    return left + '%';
  }

  getRight() {
    const right = 60 + (5 * this.depth);
    return right + '%';
  }
}
