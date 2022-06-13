import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '../../../core/directive/tooltip.module';
import { RequestDemoLeadsRoutingModule } from './request-demo-leads-routing.module';
import { RequestDemoLeadsComponent } from './request-demo-leads.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSelectModule } from 'ngx-select-ex';

@NgModule({
  declarations: [
    RequestDemoLeadsComponent
  ],
  imports: [
    CommonModule,
    RequestDemoLeadsRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSelectModule,
    TooltipModule
  ]
})
export class RequestDemoLeadsModule { }
