import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoPopupLeadsComponent } from './auto-popup-leads.component';

const routes: Routes = [{ path: '', component: AutoPopupLeadsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoPopupLeadsRoutingModule { }
