import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribeUsLeadsComponent } from './subscribe-us-leads.component';

const routes: Routes = [{ path: '', component: SubscribeUsLeadsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribeUsLeadsRoutingModule { }
