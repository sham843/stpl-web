import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobDetailsRoutingModule } from './job-details-routing.module';
import { JobDetailsComponent } from './job-details.component';
// import { NgxFileDragDropModule } from 'ngx-file-drag-drop';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    JobDetailsComponent
  ],
  imports: [
    CommonModule,
    JobDetailsRoutingModule,
    // NgxFileDragDropModule,
    ReactiveFormsModule
  ]
})
export class JobDetailsModule { }
