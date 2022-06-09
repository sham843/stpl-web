import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestDemoLeadsRoutingModule } from './request-demo-leads-routing.module';
import { RequestDemoLeadsComponent } from './request-demo-leads.component';


@NgModule({
  declarations: [
    RequestDemoLeadsComponent
  ],
  imports: [
    CommonModule,
    RequestDemoLeadsRoutingModule
  ]
})
export class RequestDemoLeadsModule { }
