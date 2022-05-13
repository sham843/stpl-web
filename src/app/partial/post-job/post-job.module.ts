import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostJobRoutingModule } from './post-job-routing.module';
import { PostJobComponent } from './post-job.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormControl } from '@angular/forms';
@NgModule({
  declarations: [
    PostJobComponent
  ],
  imports: [
    CommonModule,
    PostJobRoutingModule,
    NgxSelectModule
  ]
})
export class PostJobModule { }
