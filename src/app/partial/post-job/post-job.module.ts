import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostJobRoutingModule } from './post-job-routing.module';
import { PostJobComponent } from './post-job.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostJobComponent
  ],
  imports: [
    CommonModule,
    PostJobRoutingModule,
    NgxSelectModule,
    HttpClientModule, 
    AngularEditorModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class PostJobModule { }
