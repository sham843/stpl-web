import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApprovedRejectedApplicationsRoutingModule } from './approved-rejected-applications-routing.module';
import { ApprovedRejectedApplicationsComponent } from './approved-rejected-applications.component';


@NgModule({
  declarations: [
    ApprovedRejectedApplicationsComponent
  ],
  imports: [
    CommonModule,
    ApprovedRejectedApplicationsRoutingModule,
    NgxPaginationModule
  ]
})
export class ApprovedRejectedApplicationsModule { }
