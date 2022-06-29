import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryDetailsRoutingModule } from './industry-details-routing.module';
import { IndustryDetailsComponent } from './industry-details.component';


@NgModule({
  declarations: [
    IndustryDetailsComponent
  ],
  imports: [
    CommonModule,
    IndustryDetailsRoutingModule
  ]
})
export class IndustryDetailsModule { }
