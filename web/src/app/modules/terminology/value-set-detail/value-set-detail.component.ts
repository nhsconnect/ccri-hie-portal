import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';

import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-value-set-detail',
  templateUrl: './value-set-detail.component.html',
  styleUrls: ['./value-set-detail.component.css']
})
export class ValueSetDetailComponent implements OnInit {

  valuesetid = undefined;
  valueSet: fhir.ValueSet;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
              private fhirService: FhirService) { }

  ngOnInit() {

    this.valuesetid = this.route.snapshot.paramMap.get('valuesetid');
    if (this.valuesetid !== undefined) {
    this.fhirService.getResource('/ValueSet/' + this.valuesetid + '/$expand').subscribe( result => {
       this.valueSet = result;
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
