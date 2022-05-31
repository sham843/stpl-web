import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApprovedRejectedApplicationsRoutingModule } from './approved-rejected-applications-routing.module';
import { ApprovedRejectedApplicationsComponent } from './approved-rejected-applications.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';

@NgModule({
  declarations: [
    ApprovedRejectedApplicationsComponent
  ],
  imports: [
    CommonModule,
    ApprovedRejectedApplicationsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxSelectModule
  ]
})
export class ApprovedRejectedApplicationsModule { }
