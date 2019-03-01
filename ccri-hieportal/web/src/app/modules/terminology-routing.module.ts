import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TerminologyMainComponent} from './terminology/terminology-main/terminology-main.component';
import {ValueSetsComponent} from './terminology/value-sets/value-sets.component';
import {ConceptMapsComponent} from './terminology/concept-maps/concept-maps.component';
import {QuestionnaireComponent} from './terminology/questionnaire/questionnaire.component';
import {EOLCIntroComponent} from './terminology/eolcintro/eolcintro.component';
import {ValueSetDetailComponent} from './terminology/value-set-detail/value-set-detail.component';
import {QuestionnaireSummaryComponent} from './terminology/questionnaire-summary/questionnaire-summary.component';
import {CodeSystemComponent} from './terminology/code-system/code-system.component';
import { CodeSystemDetailComponent } from './terminology/code-system-detail/code-system-detail.component';
import {NamingSystemComponent} from './terminology/naming-system/naming-system.component';
import { NamingSystemDetailComponent } from './terminology/naming-system-detail/naming-system-detail.component';
import {ConceptMapDetailComponent} from './terminology/concept-map-detail/concept-map-detail.component';

const dosRoutes: Routes = [
  {
    path: 'term',  component: TerminologyMainComponent,
    children : [
      { path: '', component: ValueSetsComponent},
      { path: 'namingsystem', component: NamingSystemComponent},
      { path: 'namingsystem/:namingsystemid', component: NamingSystemDetailComponent},
      { path: 'codesystem', component: CodeSystemComponent},
      { path: 'codesystem/:codesystemid', component: CodeSystemDetailComponent},
      { path: 'valuesets', component: ValueSetsComponent},
      { path: 'valuesets/:valuesetid', component: ValueSetDetailComponent},
      { path: 'conceptmaps', component: ConceptMapsComponent},
      { path: 'conceptmaps/:conceptmapid', component: ConceptMapDetailComponent},
      { path: 'questionnaire', component: QuestionnaireSummaryComponent},
      { path: 'questionnaire/:questionnaireid', component: QuestionnaireComponent},
      { path: 'intro', component: EOLCIntroComponent}
    ]
  }
];

@NgModule({

  imports: [
    RouterModule.forChild(dosRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class TerminologyRoutingModule { }
