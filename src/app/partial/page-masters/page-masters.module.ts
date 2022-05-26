import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageMastersRoutingModule } from './page-masters-routing.module';
import { PageMastersComponent } from './page-masters.component';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    PageMastersComponent
  ],
  imports: [
    CommonModule,
    PageMastersRoutingModule,
    AngularEditorModule
  ]
})
export class PageMastersModule { }
