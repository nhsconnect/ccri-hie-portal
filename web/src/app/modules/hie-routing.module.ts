import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EdEncounterListComponent} from './hie/ed-encounter-list/ed-encounter-list.component';
import {PatientMainComponent} from './patient/patient-main/patient-main.component';
import {CapacityComponent} from './hie/capacity/capacity.component';
import {PatientSummaryComponent} from './patient/patient-summary/patient-summary.component';
import {PatientVitalSignsComponent} from './patient/patient-vital-signs/patient-vital-signs.component';
import {PatientEncountersComponent} from './patient/patient-encounters/patient-encounters.component';
import {PatientDocumentsComponent} from './patient/patient-documents/patient-documents.component';
import {PatientEncounterDetailComponent} from './patient/patient-encounter-detail/patient-encounter-detail.component';
import {PatientProcedureComponent} from './patient/patient-procedure/patient-procedure.component';
import {BinaryComponent} from '../component/binary/binary/binary.component';
import {PatientImmunisationComponent} from './patient/patient-immunisation/patient-immunisation.component';
import {PatientMedicationComponent} from './patient/patient-medication/patient-medication.component';
import {AuthGuard} from '../service/auth-guard';
import {PatientFindComponent} from './hie/patient-find/patient-find.component';
import {HieMainComponent} from './hie/hie-main/hie-main.component';
import {PatientCarePlanComponent} from './patient/patient-care-plan/patient-care-plan.component';
import {PatientReferralRequestComponent} from './patient/patient-referral-request/patient-referral-request.component';
import {PatientEOLCComponent} from './patient/patient-eolc/patient-eolc.component';


const hieRoutes: Routes = [
    {
    path: 'hie',  component: HieMainComponent,
    children : [
        {  path: '', canActivate: [AuthGuard], component: PatientFindComponent },
        {  path: 'caseload', canActivate: [AuthGuard], component: EdEncounterListComponent },
    /*  {  path: 'capacity', canActivate: [AuthGuard], component: CapacityComponent },*/

        {  path: 'patient/:patientid', canActivate: [AuthGuard], component: PatientMainComponent,
           children : [
               { path: '', component: PatientSummaryComponent },
               { path: 'summary', component: PatientSummaryComponent },
             /*  { path: 'atmist', component: AmbulanceATMISTComponent }, */
               { path: 'eolc', component: PatientEOLCComponent },
               { path: 'immunisation', component: PatientImmunisationComponent },
               { path: 'medication', component: PatientMedicationComponent },
             /*  { path: 'timeline', component: PatientTimeSeriesComponent }, */
               { path: 'observation', component: PatientVitalSignsComponent },
               { path: 'encounter', component: PatientEncountersComponent },
               { path: 'encounter/:encounterid', component: PatientEncounterDetailComponent },
               { path: 'document', component: PatientDocumentsComponent },
               { path: 'procedure', component: PatientProcedureComponent },
               { path: 'document/:docid', component: BinaryComponent },
               { path: 'careplan/:planid', component: PatientCarePlanComponent },
               { path: 'referral', component: PatientReferralRequestComponent },
           ]}
    ]
}
];

@NgModule({

      imports: [
    RouterModule.forChild(hieRoutes)
],
    exports: [
    RouterModule
]
  ,
  declarations: []
})
export class HieRoutingModule { }
