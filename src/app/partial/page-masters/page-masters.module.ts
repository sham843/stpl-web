import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageMastersRoutingModule } from './page-masters-routing.module';
import { PageMastersComponent } from './page-masters.component';


@NgModule({
  declarations: [
    PageMastersComponent
  ],
  imports: [
    CommonModule,
    PageMastersRoutingModule
  ]
})
export class PageMastersModule { }
