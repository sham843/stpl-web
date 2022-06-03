import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolutionDetailsRoutingModule } from './solution-details-routing.module';
import { SolutionDetailsComponent } from './solution-details.component';


@NgModule({
  declarations: [
    SolutionDetailsComponent
  ],
  imports: [
    CommonModule,
    SolutionDetailsRoutingModule
  ]
})
export class SolutionDetailsModule { }
