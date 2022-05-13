import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // for bidder routing implements
  {
    path: 'dashboard', loadChildren: () => import('../../partial/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  { path: 'post-job', loadChildren: () => import('../../partial/post-job/post-job.module').then(m => m.PostJobModule) },
  { path: 'view-applications', loadChildren: () => import('../../partial/job-applications/view-applications/view-applications.module').then(m => m.ViewApplicationsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartialLayoutRoutingModule { }
