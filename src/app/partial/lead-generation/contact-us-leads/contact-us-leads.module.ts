import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsLeadsRoutingModule } from './contact-us-leads-routing.module';
import { ContactUsLeadsComponent } from './contact-us-leads.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule } from '../../../core/directive/tooltip.module';

@NgModule({
  declarations: [
    ContactUsLeadsComponent
  ],
  imports: [
    CommonModule,
    ContactUsLeadsRoutingModule,
    NgxPaginationModule,
    TooltipModule
  ]
})
export class ContactUsLeadsModule { }
