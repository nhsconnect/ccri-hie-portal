import { Component, OnInit } from '@angular/core';
import {FhirService} from '../../../service/fhir.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';
import {ValueSetDataSource} from '../../../data-source/value-set-data-source';
import {ActivatedRoute, Router} from '@angular/router';


const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'app-value-sets',
  templateUrl: './value-sets.component.html',
  styleUrls: ['./value-sets.component.css']
})
export class ValueSetsComponent implements OnInit {


  valueSets: fhir.ValueSet[] = [];

  dataSource: ValueSetDataSource;

  displayedColumns = ['select', 'name', 'description', 'status', 'resource'];

  constructor(private fhirService: FhirService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.fhirService.get('/ValueSet?_count=20').subscribe(
      result => {
        const bundle = <fhir.Bundle> result;
        for (const entry of bundle.entry) {
          if (entry.resource.resourceType === 'ValueSet') {
            this.valueSets.push(<fhir.ValueSet> entry.resource);
          }
        }
        this.dataSource = new ValueSetDataSource(this.fhirService,  this.valueSets);
      }
    );
  }

  select(resource) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      resource: resource
    };
    const resourceDialog: MatDialogRef<ResourceDialogComponent> = this.dialog.open( ResourceDialogComponent, dialogConfig);
  }

  selectValueSet(valueSet: fhir.ValueSet) {
    this.router.navigate([valueSet.id], {relativeTo: this.route });
  }
}
