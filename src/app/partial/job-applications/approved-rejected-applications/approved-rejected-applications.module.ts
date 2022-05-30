import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApprovedRejectedApplicationsRoutingModule } from './approved-rejected-applications-routing.module';
import { ApprovedRejectedApplicationsComponent } from './approved-rejected-applications.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ApprovedRejectedApplicationsComponent
  ],
  imports: [
    CommonModule,
    ApprovedRejectedApplicationsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class ApprovedRejectedApplicationsModule { }
