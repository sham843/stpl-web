import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionMgmtSystemRoutingModule } from './election-mgmt-system-routing.module';
import { ElectionMgmtSystemComponent } from './election-mgmt-system.component';


@NgModule({
  declarations: [
    ElectionMgmtSystemComponent
  ],
  imports: [
    CommonModule,
    ElectionMgmtSystemRoutingModule
  ]
})
export class ElectionMgmtSystemModule { }
