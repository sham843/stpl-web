import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageMastersRoutingModule } from './page-masters-routing.module';
import { PageMastersComponent } from './page-masters.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxSelectModule } from 'ngx-select-ex';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PageMastersComponent
  ],
  imports: [
    CommonModule,
    PageMastersRoutingModule,
    AngularEditorModule,
    NgxPaginationModule,
    NgxSelectModule,
    ReactiveFormsModule
  ]
})
export class PageMastersModule { }
