import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribeUsLeadsRoutingModule } from './subscribe-us-leads-routing.module';
import { SubscribeUsLeadsComponent } from './subscribe-us-leads.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    SubscribeUsLeadsComponent
  ],
  imports: [
    CommonModule,
    SubscribeUsLeadsRoutingModule,
    NgxPaginationModule,
  ]
})
export class SubscribeUsLeadsModule { }
