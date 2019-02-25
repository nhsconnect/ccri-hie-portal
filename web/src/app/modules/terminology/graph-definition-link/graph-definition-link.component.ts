import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graph-definition-link',
  templateUrl: './graph-definition-link.component.html',
  styleUrls: ['./graph-definition-link.component.css']
})
export class GraphDefinitionLinkComponent implements OnInit {

  @Input()
  link: fhir.GraphDefinitionLink;

  @Input()
  level: number;

  constructor() { }

  ngOnInit() {
  }

  getLeft(parent: fhir.GraphDefinitionLinkTarget) {
    if (parent === undefined || parent.type === 'Bundle') {
      return '5%';
    }
    return '0%';
}
  getRight(parent: fhir.GraphDefinitionLinkTarget) {
    if (parent === undefined || parent.type === 'Bundle') {
      return '95%';
    }
    return '100%';
  }
  getColour(level) {
    console.log('Depth = '+level);
    if (level === '0') return 'accent';
    if (level === '2') return 'info';
    return 'primary';
  }

  getProfile(profile: string, resource: string) {
    if (profile !== undefined) return profile;
    return 'https://www.hl7.org/fhir/stu3/' + resource.toLowerCase() + '.html';
  }
}
