import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DairyRoutingModule } from './dairy-routing.module';
import { DairyComponent } from './dairy.component';


@NgModule({
  declarations: [
    DairyComponent
  ],
  imports: [
    CommonModule,
    DairyRoutingModule
  ]
})
export class DairyModule { }
