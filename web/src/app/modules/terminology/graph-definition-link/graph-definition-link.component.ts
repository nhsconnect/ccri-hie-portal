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
  parentlink: fhir.GraphDefinitionLink;

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
  getColour(resource) {
    if (resource === 'Bundle') return 'accent';
    return 'primary';
  }

  getProfile(profile: string, resource: string) {
    if (profile !== undefined) return profile;
    return 'https://www.hl7.org/fhir/stu3/' + resource.toLowerCase() + '.html';
  }
}
