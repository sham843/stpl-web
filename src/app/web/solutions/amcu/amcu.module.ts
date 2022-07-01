import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmcuRoutingModule } from './amcu-routing.module';
import { AmcuComponent } from './amcu.component';


@NgModule({
  declarations: [
    AmcuComponent
  ],
  imports: [
    CommonModule,
    AmcuRoutingModule
  ]
})
export class AmcuModule { }
