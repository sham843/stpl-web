import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoPopupLeadsRoutingModule } from './auto-popup-leads-routing.module';
import { AutoPopupLeadsComponent } from './auto-popup-leads.component';


@NgModule({
  declarations: [
    AutoPopupLeadsComponent
  ],
  imports: [
    CommonModule,
    AutoPopupLeadsRoutingModule
  ]
})
export class AutoPopupLeadsModule { }
