import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from 'src/app/errors/access-denied/access-denied.component';

const routes: Routes = [
  // for bidder routing implements
  {
    path: 'dashboard', loadChildren: () => import('../../partial/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { breadcrumb: [{ title: 'Dashboard', active: true }] }
  },
  {
    path: 'post-job', loadChildren: () => import('../../partial/post-job/post-job.module').then(m => m.PostJobModule),
    data: { breadcrumb: [{ title: 'Post Job', active: true }] }
  },

  {
    path: 'view-applications', loadChildren: () => import('../../partial/job-applications/view-applications/view-applications.module').then(m => m.ViewApplicationsModule),
    data: { breadcrumb: [{ title: 'Job Application', active: true }, { title: 'View Application', active: true }] }
  },
  {
    path: 'approved-rejected-applications', loadChildren: () => import('../../partial/job-applications/approved-rejected-applications/approved-rejected-applications.module').then(m => m.ApprovedRejectedApplicationsModule),
    data: { breadcrumb: [{ title: 'Job Application', active: true }, { title: 'Approved-Rejected', active: true }] }
  },
  {
    path: 'user-profile', loadChildren: () => import('../../partial/user-profile/user-profile.module').then(m => m.UserProfileModule),
    data: { breadcrumb: [{ title: 'User-Profile', active: true }] }
  },
  { 
    path: 'page-masters', loadChildren: () => import('../../partial/page-masters/page-masters.module').then(m => m.PageMastersModule),
    data: { breadcrumb: [{ title: 'Page Master', active: true}]}
  },
  { 
    path: 'contact-us-leads', loadChildren: () => import('../../partial/lead-generation/contact-us-leads/contact-us-leads.module').then(m => m.ContactUsLeadsModule),
    data: { breadcrumb: [{ title: 'Contact Us Leads', active: true}]} 
  },
  { 
    path: 'request-demo-leads', loadChildren: () => import('../../partial/lead-generation/request-demo-leads/request-demo-leads.module').then(m => m.RequestDemoLeadsModule),
    data: { breadcrumb: [{ title: 'Request Demo Leads', active: true}]}
  },
  { 
    path: 'auto-popup-leads', loadChildren: () => import('../../partial/lead-generation/auto-popup-leads/auto-popup-leads.module').then(m => m.AutoPopupLeadsModule),
    data: { breadcrumb: [{ title: 'Auto Popup Leads', active: true}]}
  },
  { 
    path: 'subscribe-us-leads', loadChildren: () => import('../../partial/lead-generation/subscribe-us-leads/subscribe-us-leads.module').then(m => m.SubscribeUsLeadsModule),
    data: { breadcrumb: [{ title: 'Subscribe Us Leads', active: true}]}
  },
  { path: 'access-denied', component: AccessDeniedComponent, data: { title: 'Access Denied' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartialLayoutRoutingModule { }
