import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DirectoryMainComponent} from './hpd/directory-main/directory-main.component';
import {AuthGuardOauth2} from '../service/auth-guard-oauth2';
import {SmartAppsComponent} from './hie/smart-apps/smart-apps.component';



const dosRoutes: Routes = [
  {
    path: 'dos',  component: DirectoryMainComponent,
    children : [
      {  path: 'smart',canActivate: [AuthGuardOauth2], component: SmartAppsComponent },
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
export class DirectoryRoutingModule { }
