import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostJobRoutingModule } from './post-job-routing.module';
import { PostJobComponent } from './post-job.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    PostJobComponent
  ],
  imports: [
    CommonModule,
    PostJobRoutingModule,
    NgxSelectModule,
    HttpClientModule, 
    AngularEditorModule
  ]
})
export class PostJobModule { }
