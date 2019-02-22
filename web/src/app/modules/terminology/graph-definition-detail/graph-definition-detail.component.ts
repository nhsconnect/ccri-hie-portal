import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-graph-definition-detail',
  templateUrl: './graph-definition-detail.component.html',
  styleUrls: ['./graph-definition-detail.component.css']
})
export class GraphDefinitionDetailComponent implements OnInit {

  graphid = undefined;
  graph: fhir.GraphDefinition;

  

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fhirService: FhirService) { }

  ngOnInit() {

    this.graphid = this.route.snapshot.paramMap.get('graphid');
    if (this.graphid !== undefined) {
      this.fhirService.getResource('/GraphDefinition/' + this.graphid ).subscribe( result => {
        const graph: fhir.GraphDefinition = result;
        this.graph = graph;
      });
    }
  }

  view(resource) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      resource: resource
    };
    this.dialog.open( ResourceDialogComponent, dialogConfig);
  }


}
