import {Component, Inject, Input, OnInit} from '@angular/core';
import integer = fhir.integer;
import {EprService} from '../../service/epr.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


declare var $: any;

@Component({
  selector: 'app-resource-viewer',
  templateUrl: './resource-dialog.component.html',
  styleUrls: ['./resource-dialog.component.css']
})
export class ResourceDialogComponent implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<ResourceDialogComponent>,
    public patientEPRService: EprService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.resource = data.resource;
  }

  @Input()
  resource = undefined;


  ngOnInit() {
    console.log('Init Called TREE');

    this.patientEPRService.getResourceChangeEvent().subscribe(
      resource => {
        this.resource = resource;
        /*
        this.buildNodes();

        $('#docTreeView').jstree('destroy');

        $('#docTreeView').jstree({
          'core' : {
            'data' : this.treeData
          }
        });
        */
      }
    );

  }







  entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  escapeHtml(source: string) {
    return String(source).replace(/[&<>"'\/]/g, s => this.entityMap[s]);
  }


 }


