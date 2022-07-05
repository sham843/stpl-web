import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'angular-image-slider';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SliderModule,
    NgImageSliderModule
    

  ]
})
export class HomeModule { }
