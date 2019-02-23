import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LinksService} from '../../service/links.service';
import {BundleService} from '../../service/bundle.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {FhirService} from '../../service/fhir.service';
import {ResourceDialogComponent} from '../../dialog/resource-dialog/resource-dialog.component';
import {FlagDataSource} from '../../data-source/flag-data-source';
import {PractitionerDialogComponent} from '../../dialog/practitioner-dialog/practitioner-dialog.component';

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


  showPractitioner(flag: fhir.Flag) {
    let practitioners = [];


    this.bundleService.getResource(flag.author.reference).subscribe((practitioner) => {
        if (practitioner !== undefined && practitioner.resourceType === "Practitioner") {
          practitioners.push(<fhir.Practitioner> practitioner);

          const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          // dialogConfig.width="800px";
          dialogConfig.data = {
            id: 1,
            practitioners: practitioners,
            useBundle : this.useBundle
          };
          this.dialog.open(PractitionerDialogComponent, dialogConfig);
        }
      }
    );

  }


}
