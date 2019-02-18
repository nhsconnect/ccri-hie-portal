import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';

@Component({
  selector: 'app-concept-map-detail',
  templateUrl: './concept-map-detail.component.html',
  styleUrls: ['./concept-map-detail.component.css']
})
export class ConceptMapDetailComponent implements OnInit {

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

  conceptmapid = undefined;
  conceptMap: fhir.ConceptMap;

  constructor(private route: ActivatedRoute,
              private fhirService: FhirService) { }

  ngOnInit() {
    this.conceptmapid = this.route.snapshot.paramMap.get('conceptmapid');
    if (this.conceptmapid !== undefined) {
      this.fhirService.getResource('/ConceptMap/' + this.conceptmapid).subscribe( result => {
        this.conceptMap = result;
      });
    }
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
