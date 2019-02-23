import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClinicalImpressionDataSource} from '../../data-source/clinical-impression-data-source';
import {LinksService} from '../../service/links.service';
import {BundleService} from '../../service/bundle.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {FhirService} from '../../service/fhir.service';
import {ResourceDialogComponent} from '../../dialog/resource-dialog/resource-dialog.component';
import {PractitionerDialogComponent} from '../../dialog/practitioner-dialog/practitioner-dialog.component';

@Component({
  selector: 'app-clinical-impression',
  templateUrl: './clinical-impression.component.html',
  styleUrls: ['./clinical-impression.component.css']
})

export class ClinicalImpressionComponent implements OnInit {

    @Input() clinicalImpressions: fhir.ClinicalImpression[];

    @Output() clinicalImpression = new EventEmitter<any>();

    @Input() patientId: string;

    @Input() useBundle = false;

    dataSource: ClinicalImpressionDataSource;

    displayedColumns = ['date', 'prognosis', 'prognosislink', 'assessor', 'resource'];

    constructor(private linksService: LinksService,
                public bundleService: BundleService,
                public dialog: MatDialog,
                public fhirService: FhirService) { }

    ngOnInit() {
        if (this.patientId !== undefined) {
            this.dataSource = new ClinicalImpressionDataSource(this.fhirService, this.patientId, []);
        } else {
            this.dataSource = new ClinicalImpressionDataSource(this.fhirService, undefined, this.clinicalImpressions);
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
        const resourceDialog: MatDialogRef<ResourceDialogComponent> = this.dialog.open( ResourceDialogComponent, dialogConfig);
    }

    isSNOMED(system: string): boolean {
        return this.linksService.isSNOMED(system);
    }
    getSNOMEDLink(code: fhir.Coding) {
        if (this.linksService.isSNOMED(code.system)) {
            window.open(this.linksService.getSNOMEDLink(code), '_blank');
        }
    }
    getCodeSystem(system: string): string {
        return this.linksService.getCodeSystem(system);
    }

  showPractitioner(clinicalImpression: fhir.ClinicalImpression) {
    let practitioners = [];


    this.bundleService.getResource(clinicalImpression.assessor.reference).subscribe((practitioner) => {
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
