import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TerminologyMainComponent} from './terminology/terminology-main/terminology-main.component';
import {ValueSetsComponent} from './terminology/value-sets/value-sets.component';
import {ConceptMapsComponent} from './terminology/concept-maps/concept-maps.component';
import {QuestionnaireComponent} from './terminology/questionnaire/questionnaire.component';
import {EOLCIntroComponent} from './terminology/eolcintro/eolcintro.component';
import {ValueSetDetailComponent} from './terminology/value-set-detail/value-set-detail.component';

const dosRoutes: Routes = [
  {
    path: 'term',  component: TerminologyMainComponent,
    children : [
      { path: '', component: ValueSetsComponent},
      { path: 'valuesets', component: ValueSetsComponent},
      { path: 'valuesets/:valuesetid', component: ValueSetDetailComponent},
      { path: 'conceptmaps', component: ConceptMapsComponent},
      { path: 'questionnaire', component: QuestionnaireComponent},
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
