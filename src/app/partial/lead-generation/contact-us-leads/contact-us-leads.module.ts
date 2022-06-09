import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsLeadsRoutingModule } from './contact-us-leads-routing.module';
import { ContactUsLeadsComponent } from './contact-us-leads.component';


@NgModule({
  declarations: [
    ContactUsLeadsComponent
  ],
  imports: [
    CommonModule,
    ContactUsLeadsRoutingModule
  ]
})
export class ContactUsLeadsModule { }
