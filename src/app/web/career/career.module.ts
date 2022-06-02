import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CareerRoutingModule } from './career-routing.module';
import { CareerComponent } from './career.component';


@NgModule({
  declarations: [
    CareerComponent
  ],
  imports: [
    CommonModule,
    CareerRoutingModule,
    NgxPaginationModule
  ]
})
export class CareerModule { }
