import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graph-definition-link',
  templateUrl: './graph-definition-link.component.html',
  styleUrls: ['./graph-definition-link.component.css']
})
export class GraphDefinitionLinkComponent implements OnInit {

  @Input()
  link: fhir.GraphDefinitionLink;

  constructor() { }

  ngOnInit() {
  }

}
