import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';
import {EprService} from '../../../service/epr.service';
import {MatChip} from '@angular/material/chips';
import {IAlertConfig, TdDialogService} from '@covalent/core/dialogs';


@Component({
  selector: 'app-patient-summary',
  templateUrl: './patient-summary.component.html',
  styleUrls: ['./patient-summary.component.css']
})
export class PatientSummaryComponent implements OnInit {

    documents: fhir.DocumentReference[] = [];
    nrlsdocuments: fhir.DocumentReference[] = [];
    encounters: fhir.Encounter[] = [];
   // careplans: fhir.CarePlan[]=[];
    flags: fhir.Flag[] = [];
    eolc: fhir.Flag = undefined;
    patient: fhir.Patient = undefined;

    gpallergies: fhir.AllergyIntolerance[] = [];
    gpMedicationStatement: fhir.MedicationStatement[] = [];
    gpMedicationRequest: fhir.MedicationRequest[] = [];
    gpMedication: fhir.Medication[] = [];
    gpPatient: fhir.Patient[] = [];
    gpOrganisation: fhir.Organization[] = [];
    gpPractitioner: fhir.Practitioner[] = [];

    lhcreEncounters: fhir.Encounter[];
    lhcreAllergies: fhir.AllergyIntolerance[] = [];
    lhcreMedicationStatement: fhir.MedicationStatement[] = [];
    lhcreConditions: fhir.Condition[] = [];

    lhcrcolor = 'info';
    acutecolor = 'info';
    gpcolor = 'info';
    nrlscolor = 'info';


    @ViewChild('gpchip', {static: false}) gpchip: MatChip;

  constructor(private router: Router,
              private fhirSrv: FhirService,
              private route: ActivatedRoute,
              private eprService: EprService,
              private _dialogService: TdDialogService,
              private _viewContainerRef: ViewContainerRef) { }

  ngOnInit() {

      const patientid = this.route.snapshot.paramMap.get('patientid');

      console.log(patientid);

      this.clearDown();
      // removed &_revinclude=CarePlan:patient
      this.fhirSrv.get('/Patient?_id=' + patientid +
        '&_revinclude=Condition:patient&_revinclude=AllergyIntolerance:patient&_revinclude=MedicationStatement:patient'
        + '&_revinclude=Flag:patient&_count=100').subscribe(
          bundle => {
              if (bundle.entry !== undefined) {
                  for (const entry of bundle.entry) {
                      switch (entry.resource.resourceType) {
                          case 'Patient':
                              const patient: fhir.Patient = <fhir.Patient> entry.resource;
                              this.patient = patient;
                              break;
                          case 'Condition':
                              this.lhcreConditions.push(<fhir.Condition> entry.resource);
                              break;
                          case 'AllergyIntolerance':
                              this.lhcreAllergies.push(<fhir.AllergyIntolerance> entry.resource);
                              break;
                          case 'MedicationStatement':
                              this.lhcreMedicationStatement.push(<fhir.MedicationStatement> entry.resource);
                              break;
                        case 'Flag':
                              const flag = <fhir.Flag> entry.resource;
                              this.flags.push(flag);

                              if (flag.code !== undefined && flag.code.coding[0].code === '526631000000108') {
                                this.eolc = flag;
                              }
                              break;
                       /* case 'CarePlan':
                            this.careplans.push(<fhir.CarePlan> entry.resource);
                            break; */
                      }

                  }
              }
            this.eprService.acuteConnectStatusEmitter.emit('primary');

          }
          , () => {
              this.eprService.acuteConnectStatusEmitter.emit('warn');
          }
          , () => {
              for (const identifier of this.patient.identifier) {
                  if (identifier.system === 'https://fhir.nhs.uk/Id/nhs-number') {
                      this.getGPData(identifier.value);
                      this.getNRLSData(identifier.value);
                  }
              }
          }
      );

      this.eprService.getGPCStatusChangeEvent().subscribe( colour => {
          this.gpcolor = colour;
      });
      this.eprService.getNRLSStatusChangeEvent().subscribe( colour => {
          this.nrlscolor = colour;
      });

    this.eprService.getAcuteStatusChangeEvent().subscribe( colour => {
      this.acutecolor = colour;
    });
  }

    getGPData(nhsNumber: string) {
        this.gpallergies = [];
        this.gpMedicationStatement = [];
        this.gpMedicationRequest  = [];
        this.gpPatient  = [];
        this.gpPractitioner  = [];
        this.gpOrganisation = [];
        this.eprService.gpConnectStatusEmitter.emit('info');


        this.fhirSrv.postGPC(nhsNumber).subscribe( bundle => {
            console.log(bundle);
            if (bundle.entry !== undefined) {
                for (const entry of bundle.entry) {
                    // console.log(entry.resource.resourceType);
                    switch (entry.resource.resourceType) {
                        case 'AllergyIntolerance':
                            this.gpallergies.push(<fhir.AllergyIntolerance> entry.resource);
                            break;
                        case 'MedicationRequest':
                            this.gpMedicationRequest.push(<fhir.MedicationRequest> entry.resource);
                            break;
                        case 'MedicationStatement':
                            this.gpMedicationStatement.push(<fhir.MedicationStatement> entry.resource);
                            break;
                        case 'Medication':
                            this.gpMedication.push(<fhir.Medication> entry.resource);
                            break;
                        case 'Patient':
                            this.gpPatient.push(<fhir.Patient> entry.resource);
                            break;
                        case 'Practitioner':
                            this.gpPractitioner.push(<fhir.Practitioner> entry.resource);
                            break;
                        case 'Organization':
                            this.gpOrganisation.push(<fhir.Organization> entry.resource);
                            break;
                    }
                }
            }
            for (const pres of this.gpMedicationRequest) {
                const meds = pres.medicationReference.reference.split('/');
                for (const med of this.gpMedication) {

                    if (meds[1] === med.id) {
                        // console.log(med);
                        pres.medicationReference.display = med.code.coding[0].display;
                        if (med.code.coding[0].display === undefined || med.code.coding[0].display === '') {
                            pres.medicationReference.display = med.code.coding[0].extension[0].extension[1].valueString;
                        }
                    }
                }
            }
            for (const pres of this.gpMedicationStatement) {
                const meds = pres.medicationReference.reference.split('/');
                for (const med of this.gpMedication) {
                    if (meds[1] === med.id) {
                        // console.log(med);
                        pres.medicationReference.display = med.code.coding[0].display;
                        if (med.code.coding[0].display === undefined || med.code.coding[0].display === '') {
                            pres.medicationReference.display = med.code.coding[0].extension[0].extension[1].valueString;
                        }
                    }
                }
            }
            this.eprService.gpConnectStatusEmitter.emit('primary');


        }, () => {
            console.log('failed to retrieve data from GP Connect');
            this.eprService.gpConnectStatusEmitter.emit('warn');

        });

    }

    getNRLSData(nhsNumber: string) {
        this.eprService.nrlsConnectStatusEmitter.emit('info');

        this.fhirSrv.getNRLS('/DocumentReference?subject=https%3A%2F%2Fdemographics.spineservices.nhs.uk%2FSTU3%2FPatient%2F' + nhsNumber)
          .subscribe( bundle => {
                if (bundle.entry !== undefined) {
                    for (const entry of bundle.entry) {
                        const document: fhir.DocumentReference = <fhir.DocumentReference> entry.resource;
                        this.nrlsdocuments.push(document);

                    }
                }
                this.eprService.nrlsConnectStatusEmitter.emit('primary');
            },
            () => {
                console.log('failed to retrieve data from NRLS');
                this.eprService.nrlsConnectStatusEmitter.emit('warn');
            });
    }

    clearDown() {


        this.encounters = [];
        // this.careplans = [];
        this.patient = undefined;

        this.documents = [];
        this.nrlsdocuments = [];

        this.lhcreEncounters = [];
        this.lhcreAllergies = [];
        this.lhcreMedicationStatement = [];
        this.lhcreConditions = [];
        this.eolc = undefined;
    }

    selectEncounter(encounter: fhir.Reference) {

        const str = encounter.reference.split('/');
        console.log(this.route.root);
        this.router.navigate(['..', 'encounter', str[1]] , { relativeTo : this.route});

    }

    selectCarePlan(carePlan: fhir.Reference) {

        this.router.navigate(['..', 'careplan', carePlan.id] , { relativeTo : this.route});

    }

  selectDocument(document: fhir.DocumentReference) {
    console.log(document);

    if (document.content !== undefined && document.content.length > 0) {

      this.eprService.setDocumentReference(document);

      this.router.navigate(['..', 'document', document.id], {relativeTo: this.route });

    } else {
      let alertConfig: IAlertConfig = { message : 'Unable to locate document.'};
      alertConfig.disableClose =  false; // defaults to false
      alertConfig.viewContainerRef = this._viewContainerRef;
      alertConfig.title = 'Alert';
      alertConfig.closeButton = 'Close';
      alertConfig.width = '400px';
      this._dialogService.openAlert(alertConfig);
    }


  }

}
