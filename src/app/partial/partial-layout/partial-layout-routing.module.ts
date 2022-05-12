import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // for bidder routing implements
  {
    path: 'dashboard', loadChildren: () => import('../../partial/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  { path: 'post-job', loadChildren: () => import('../../partial/post-job/post-job.module').then(m => m.PostJobModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartialLayoutRoutingModule { }
