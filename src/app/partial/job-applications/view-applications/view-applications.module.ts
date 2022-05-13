import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewApplicationsRoutingModule } from './view-applications-routing.module';
import { ViewApplicationsComponent } from './view-applications.component';


@NgModule({
  declarations: [
    ViewApplicationsComponent
  ],
  imports: [
    CommonModule,
    ViewApplicationsRoutingModule
  ]
})
export class ViewApplicationsModule { }
