import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KimsComponent } from './kims.component';

const routes: Routes = [{ path: '', component: KimsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KimsRoutingModule { }
