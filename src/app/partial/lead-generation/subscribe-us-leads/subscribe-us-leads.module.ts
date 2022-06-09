import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribeUsLeadsRoutingModule } from './subscribe-us-leads-routing.module';
import { SubscribeUsLeadsComponent } from './subscribe-us-leads.component';


@NgModule({
  declarations: [
    SubscribeUsLeadsComponent
  ],
  imports: [
    CommonModule,
    SubscribeUsLeadsRoutingModule
  ]
})
export class SubscribeUsLeadsModule { }
