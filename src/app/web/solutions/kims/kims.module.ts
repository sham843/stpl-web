import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KimsRoutingModule } from './kims-routing.module';
import { KimsComponent } from './kims.component';


@NgModule({
  declarations: [
    KimsComponent
  ],
  imports: [
    CommonModule,
    KimsRoutingModule
  ]
})
export class KimsModule { }
