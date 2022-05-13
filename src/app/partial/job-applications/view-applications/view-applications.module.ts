import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewApplicationsRoutingModule } from './view-applications-routing.module';
import { ViewApplicationsComponent } from './view-applications.component';
import { NgxSelectModule } from 'ngx-select-ex';


@NgModule({
  declarations: [
    ViewApplicationsComponent
  ],
  imports: [
    CommonModule,
    ViewApplicationsRoutingModule,
    NgxSelectModule
  ]
})
export class ViewApplicationsModule { }
