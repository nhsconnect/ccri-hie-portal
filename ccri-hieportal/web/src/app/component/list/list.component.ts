import {Component, Input, OnInit} from '@angular/core';
import {ListEntryDataSource} from '../../data-source/list-entry-data-source';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ResourceDialogComponent} from '../../dialog/resource-dialog/resource-dialog.component';
import {BundleService} from '../../service/bundle.service';
import {FhirService} from '../../service/fhir.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: fhir.List;

  @Input() useBundle = false;

  dataSource: ListEntryDataSource;

  displayedColumns = [ 'reference' ];

  constructor(
    public bundleService: BundleService,
    public dialog: MatDialog,
    public fhirService: FhirService) { }

  ngOnInit() {
    this.dataSource = new ListEntryDataSource(this.fhirService, undefined, this.list.entry);
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


}
