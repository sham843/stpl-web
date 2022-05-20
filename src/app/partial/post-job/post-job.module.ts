import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostJobRoutingModule } from './post-job-routing.module';
import { PostJobComponent } from './post-job.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class PostJobModule { }
