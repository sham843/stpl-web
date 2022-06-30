import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivestockRoutingModule } from './livestock-routing.module';
import { LivestockComponent } from './livestock.component';


@NgModule({
  declarations: [
    LivestockComponent
  ],
  imports: [
    CommonModule,
    LivestockRoutingModule
  ]
})
export class LivestockModule { }
