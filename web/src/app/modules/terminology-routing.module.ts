import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TerminologyMainComponent} from './terminology/terminology-main/terminology-main.component';
import {ValueSetsComponent} from './terminology/value-sets/value-sets.component';
import {ConceptMapsComponent} from './terminology/concept-maps/concept-maps.component';
import {QuestionnaireComponent} from './terminology/questionnaire/questionnaire.component';

const dosRoutes: Routes = [
  {
    path: 'term',  component: TerminologyMainComponent,
    children : [
      { path: '', component: ValueSetsComponent},
      { path: 'valuesets', component: ValueSetsComponent},
      { path: 'conceptmaps', component: ConceptMapsComponent},
      { path: 'questionnaire', component: QuestionnaireComponent}
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
