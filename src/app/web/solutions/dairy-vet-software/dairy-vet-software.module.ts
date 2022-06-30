import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DairyVetSoftwareRoutingModule } from './dairy-vet-software-routing.module';
import { DairyVetSoftwareComponent } from './dairy-vet-software.component';


@NgModule({
  declarations: [
    DairyVetSoftwareComponent
  ],
  imports: [
    CommonModule,
    DairyVetSoftwareRoutingModule
  ]
})
export class DairyVetSoftwareModule { }
