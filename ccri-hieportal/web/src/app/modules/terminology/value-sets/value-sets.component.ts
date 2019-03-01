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

  searchInputName;

  searchInputPublisher;

  displayedColumns = ['view', 'name', 'description', 'status', 'resource'];

  constructor(private fhirService: FhirService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

  }

  search(name, publisher) {
    //console.log(event);

    console.log("search is called "  + name);
    if (name !== undefined) {
      this.searchInputName = name;
    }
    if (publisher !== undefined) {
      this.searchInputPublisher = publisher;
    }

    let url = '/ValueSet';

    if (this.searchInputName !== undefined) {
      url = url + '?name='+ this.searchInputName;
    }
    if (this.searchInputPublisher !== undefined) {
      if (this.searchInputName === undefined) {
        url = url + '?publisher=' + this.searchInputPublisher;
      } else {
        url = url + '&publisher=' + this.searchInputPublisher;
      }
    }
    url = url + '&_count=20';

    this.valueSets = [];

    console.log("the valuset url is " + url);

    this.fhirService.get(url).subscribe(
      result => {
        const bundle = <fhir.Bundle> result;
        if (bundle.entry !== undefined) {
          for (const entry of bundle.entry) {
            if (entry.resource.resourceType === 'ValueSet') {
              this.valueSets.push(<fhir.ValueSet>entry.resource);
            }
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

  view(valueSet: fhir.ValueSet) {
    this.router.navigate([valueSet.id], {relativeTo: this.route });
  }
}
