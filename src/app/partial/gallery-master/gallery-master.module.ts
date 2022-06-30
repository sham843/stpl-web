import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryMasterRoutingModule } from './gallery-master-routing.module';
import { GalleryMasterComponent } from './gallery-master.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [
    GalleryMasterComponent
  ],
  imports: [
    CommonModule,
    GalleryMasterRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,

  ]
})
export class GalleryMasterModule { }
