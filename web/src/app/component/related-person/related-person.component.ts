import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {FhirService} from '../../service/fhir.service';
import {BundleService} from '../../service/bundle.service';
import {RelatedPersonDataSource} from '../../data-source/related-person-data-source';
import {ResourceDialogComponent} from "../../dialog/resource-dialog/resource-dialog.component";


@Component({
  selector: 'app-related-person',
  templateUrl: './related-person.component.html',
  styleUrls: ['./related-person.component.css']
})
export class RelatedPersonComponent implements OnInit {

  @Input() persons: fhir.RelatedPerson[];


  @Output() person = new EventEmitter<any>();

  dataSource: RelatedPersonDataSource;

  displayedColumns = ['person', 'relationship', 'dob', 'gender',  'contact',  'resource'];

  constructor( private dialog: MatDialog,
               public fhirService: FhirService,
               public bundleService: BundleService) {

  }
  ngOnInit() {
    this.dataSource = new RelatedPersonDataSource(this.fhirService, undefined, this.persons);
  }



  getFirstAddress(patient: fhir.Patient): String {
    if (patient === undefined) { return ''; }
    if (patient.address === undefined || patient.address.length === 0) {
      return '';
    }
    return patient.address[0].line.join(', ') + ', ' + patient.address[0].city + ', ' + patient.address[0].postalCode;

  }
  getLastName(patient: fhir.Patient): String {
    if (patient === undefined) { return ''; }
    if (patient.name === undefined || patient.name.length === 0) {
      return '';
    }

    let name = '';
    if (patient.name[0].family !== undefined) { name += patient.name[0].family.toUpperCase(); }
    return name;

  }
  getFirstName(patient: fhir.RelatedPerson): String {
    if (patient === undefined) { return ''; }
    if (patient.name === undefined || patient.name.length === 0) {
      return '';
    }
    // Move to address
    let name = '';
    if (patient.name[0].given !== undefined && patient.name[0].given.length > 0) {
      name += ', ' + patient.name[0].given[0];
    }

    if (patient.name[0].prefix !== undefined && patient.name[0].prefix.length > 0) {
      name += ' (' + patient.name[0].prefix[0] + ')' ;
    }
    return name;

  }

  getFirstTelecom(patient: fhir.RelatedPerson): String {
    if (patient === undefined) {
      return '';
    }
    if (patient.telecom === undefined || patient.telecom.length === 0) { return ''; }
    // Move to address
    return patient.telecom[0].value;

  }

  getIdentifier(identifier: fhir.Identifier): String {
    let name: String = identifier.system;
    if (identifier.system.indexOf('nhs-number') !== -1) {

      name = 'NHS Number';
    } else if (identifier.system.indexOf('pas-number') !== -1) {
      name = 'PAS Number';
    } else if (identifier.system.indexOf('PPMIdentifier') !== -1) {
      name = 'LTH PPM Id';
    }
    return name;
  }

  getNHSIdentifier(patient: fhir.RelatedPerson): String {
    if (patient === undefined) { return ''; }
    if (patient.identifier === undefined || patient.identifier.length === 0) { return ''; }
    // Move to address
    let NHSNumber: String = '';
    for (let f = 0; f < patient.identifier.length; f++) {
      if (patient.identifier[f].system.includes('nhs-number') ) {
        NHSNumber = patient.identifier[f].value.substring(0, 3) + ' '
          + patient.identifier[f].value.substring(3, 6) + ' ' + patient.identifier[f].value.substring(6);
      }
    }
    return NHSNumber;

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
