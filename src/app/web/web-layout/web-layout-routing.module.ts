import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../../web/home/home.module').then(m => m.HomeModule) },
  { path: 'discover-us', loadChildren: () => import('../../web/about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'contact-us', loadChildren: () => import('../../web/contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'career', loadChildren: () => import('../../web/career/career.module').then(m => m.CareerModule) },
  { path: 'job-details', loadChildren: () => import('../../web/career/job-details/job-details.module').then(m => m.JobDetailsModule) },
  { path: 'blogs', loadChildren: () => import('../../web/blogs/blogs.module').then(m => m.BlogsModule) },
  { path: 'solutions', loadChildren: () => import('../../web/solutions/solutions.module').then(m => m.SolutionsModule) },
  { path: 'projects', loadChildren: () => import('../../web/projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'services', loadChildren: () => import('../../web/services/services.module').then(m => m.ServicesModule) },
  { path: 'industries', loadChildren: () => import('../../web/industries/industries.module').then(m => m.IndustriesModule) },
  { path: 'login', loadChildren: () => import('../../web/login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebLayoutRoutingModule { }
