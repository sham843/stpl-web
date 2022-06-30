import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefenceRoutingModule } from './defence-routing.module';
import { DefenceComponent } from './defence.component';


@NgModule({
  declarations: [
    DefenceComponent
  ],
  imports: [
    CommonModule,
    DefenceRoutingModule
  ]
})
export class DefenceModule { }
