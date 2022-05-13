import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovedRejectedApplicationsRoutingModule } from './approved-rejected-applications-routing.module';
import { ApprovedRejectedApplicationsComponent } from './approved-rejected-applications.component';


@NgModule({
  declarations: [
    ApprovedRejectedApplicationsComponent
  ],
  imports: [
    CommonModule,
    ApprovedRejectedApplicationsRoutingModule
  ]
})
export class ApprovedRejectedApplicationsModule { }
