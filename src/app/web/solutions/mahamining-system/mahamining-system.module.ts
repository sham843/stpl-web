import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MahaminingSystemRoutingModule } from './mahamining-system-routing.module';
import { MahaminingSystemComponent } from './mahamining-system.component';


@NgModule({
  declarations: [
    MahaminingSystemComponent
  ],
  imports: [
    CommonModule,
    MahaminingSystemRoutingModule
  ]
})
export class MahaminingSystemModule { }
