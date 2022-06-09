import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestDemoLeadsComponent } from './request-demo-leads.component';

const routes: Routes = [{ path: '', component: RequestDemoLeadsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestDemoLeadsRoutingModule { }
