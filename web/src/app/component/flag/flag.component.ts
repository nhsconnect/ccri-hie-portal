import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LinksService} from '../../service/links.service';
import {BundleService} from '../../service/bundle.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {FhirService} from '../../service/fhir.service';
import {ResourceDialogComponent} from '../../dialog/resource-dialog/resource-dialog.component';
import {FlagDataSource} from '../../data-source/flag-data-source';
import {PractitionerDialogComponent} from '../../dialog/practitioner-dialog/practitioner-dialog.component';
import {OrganisationDialogComponent} from '../../dialog/organisation-dialog/organisation-dialog.component';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {

  @Input() flags: fhir.Flag[];

  @Output() flag = new EventEmitter<any>();

  @Input() patientId: string;

  @Input() useBundle = false;

  dataSource: FlagDataSource;

  displayedColumns = ['alert', 'status', 'start', 'end', 'author', 'resource'];

  constructor(private linksService: LinksService,
              public bundleService: BundleService,
              public dialog: MatDialog,
              public fhirService: FhirService) { }

  ngOnInit() {
    if (this.patientId !== undefined) {
      this.dataSource = new FlagDataSource(this.fhirService, this.patientId, []);
    } else {
      this.dataSource = new FlagDataSource(this.fhirService, undefined, this.flags);
    }
  }

  select(resource) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      resource: resource
    };
    this.dialog.open( ResourceDialogComponent, dialogConfig);
  }


  showAuthors(flag: fhir.Flag) {
    const refs = [];
    if (flag.author !== undefined) {
        this.bundleService.getResource(flag.author.reference).subscribe((resource) => {
            if (resource !== undefined) {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              refs.push(resource);
              if (resource.resourceType === 'Practitioner') {
                dialogConfig.data = {
                  id: 1,
                  practitioners: refs,
                  useBundle: this.useBundle
                };
                this.dialog.open(PractitionerDialogComponent, dialogConfig);
              }
              if (resource.resourceType === 'Organization') {
                dialogConfig.data = {
                  id: 1,
                  organisations: refs,
                  useBundle: this.useBundle
                };
                this.dialog.open(OrganisationDialogComponent, dialogConfig);
              }
            }
          }
        );
    }
  }


}
