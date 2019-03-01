import {Component, Input, OnInit, Output} from '@angular/core';

import {BundleService} from '../../service/bundle.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {FhirService} from '../../service/fhir.service';
import {ResourceDialogComponent} from '../../dialog/resource-dialog/resource-dialog.component';
import {PractitionerDialogComponent} from '../../dialog/practitioner-dialog/practitioner-dialog.component';
import {CarePlanActivityDataSource} from '../../data-source/care-plan-activity-data-source';

@Component({
  selector: 'app-care-plan-activity',
  templateUrl: './care-plan-activity.component.html',
  styleUrls: ['./care-plan-activity.component.css']
})
export class CarePlanActivityComponent implements OnInit {

  @Input() careActivity: fhir.CarePlanActivity[];
  @Input() useBundle = false;

  dataSource: CarePlanActivityDataSource;

  displayedColumns = [ 'detail', 'status', 'description', 'resource'];

  constructor(
              public bundleService: BundleService,
              public dialog: MatDialog,
              public fhirService: FhirService) { }

  ngOnInit() {
      this.dataSource = new CarePlanActivityDataSource(this.fhirService, undefined, this.careActivity);
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

  showPractitioner(careplan: fhir.CarePlan) {
    const practitioners = [];

    for (const reference of careplan.author) {
      this.bundleService.getResource(reference.reference).subscribe((practitioner) => {
          if (practitioner !== undefined && practitioner.resourceType === 'Practitioner') {
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
            const resourceDialog: MatDialogRef<PractitionerDialogComponent> = this.dialog.open(PractitionerDialogComponent, dialogConfig);
          }
        }
      );
    }
  }
}
