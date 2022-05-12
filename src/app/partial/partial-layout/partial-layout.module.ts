import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartialLayoutRoutingModule } from './partial-layout-routing.module';
import { PartialLayoutComponent } from './partial-layout.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    PartialLayoutComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,  
  ],
  imports: [
    CommonModule,
    PartialLayoutRoutingModule,
  ],
  
})
export class PartialLayoutModule { }
