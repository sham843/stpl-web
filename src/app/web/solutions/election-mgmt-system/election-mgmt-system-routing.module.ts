import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectionMgmtSystemComponent } from './election-mgmt-system.component';

const routes: Routes = [{ path: '', component: ElectionMgmtSystemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectionMgmtSystemRoutingModule { }
