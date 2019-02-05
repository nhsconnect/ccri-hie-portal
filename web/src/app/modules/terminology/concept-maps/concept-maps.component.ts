import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-conccept-maps',
  templateUrl: './concept-maps.component.html',
  styleUrls: ['./concept-maps.component.css']
})
export class ConceptMapsComponent implements OnInit {

  // https://material.angular.io/cdk/drag-drop/examples

  valueSet1 = [
    'U - Unmarried',
    'D - Divorced',
    'L - Legally Separated',
    'M - Married',
    'S - Never Married',
    'W - Widowed',
    'UNK - Unknown'
  ];


    valueSet2 = [

      'P - Separated',
      'N - Not disclosed',
      'S - Never Married',
      'W - Widowed',
      'UNK - Unknown'
    ];



  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }



}
