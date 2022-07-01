import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuardService } from 'src/app/core/auth/no-auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../../web/home/home.module').then(m => m.HomeModule) },
  { path: 'discover-us', loadChildren: () => import('../../web/about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'contact-us', loadChildren: () => import('../../web/contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'career', loadChildren: () => import('../../web/career/career.module').then(m => m.CareerModule) },
  { path: 'career/job-details/:id', loadChildren: () => import('../../web/career/job-details/job-details.module').then(m => m.JobDetailsModule) },
  { path: 'blogs', loadChildren: () => import('../../web/blogs/blogs.module').then(m => m.BlogsModule) },
  { path: 'solutions', loadChildren: () => import('../../web/solutions/solutions.module').then(m => m.SolutionsModule) },
  { path: 'solutions/automatic-milk-collection-unit', loadChildren: () => import('../../web/solutions/amcu/amcu.module').then(m => m.AmcuModule) },
  { path: 'solutions/kote-inventory-management-system', loadChildren: () => import('../../web/solutions/kims/kims.module').then(m => m.KimsModule) },
  { path: 'solutions/election-management-system', loadChildren: () => import('../../web/solutions/election-mgmt-system/election-mgmt-system.module').then(m => m.ElectionMgmtSystemModule) },
  { path: 'solutions/mahamining-system', loadChildren: () => import('../../web/solutions/mahamining-system/mahamining-system.module').then(m => m.MahaminingSystemModule) },
  { path: 'solutions/dairy-vet-software', loadChildren: () => import('../../web/solutions/dairy-vet-software/dairy-vet-software.module').then(m => m.DairyVetSoftwareModule) },
  { path: 'projects/project-details/:id', loadChildren: () => import('../../web/projects/project-details/project-details.module').then(m => m.ProjectDetailsModule) },
  // { path: 'solutions/solution-details/:id', loadChildren: () => import('../../web/solutions/solution-details/solution-details.module').then(m => m.SolutionDetailsModule) },
  { path: 'projects', loadChildren: () => import('../../web/projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'services', loadChildren: () => import('../../web/services/services.module').then(m => m.ServicesModule) },
  { path: 'services/:id', loadChildren: () => import('../../web/services/services.module').then(m => m.ServicesModule) },
  { path: 'industries', loadChildren: () => import('../../web/industries/industries.module').then(m => m.IndustriesModule) },
  // { path: 'industry-details', loadChildren: () => import('../../web/industries/industry-details/industry-details.module').then(m => m.IndustryDetailsModule) },
  { path: 'industries/defence', loadChildren: () => import('../../web/industries/defence/defence.module').then(m => m.DefenceModule) },
  { path: 'industries/dairy', loadChildren: () => import('../../web/industries/dairy/dairy.module').then(m => m.DairyModule) },
  { path: 'industries/election', loadChildren: () => import('../../web/industries/election/election.module').then(m => m.ElectionModule) },
  { path: 'industries/mining', loadChildren: () => import('../../web/industries/mining/mining.module').then(m => m.MiningModule) },
  { path: 'industries/vehicle-tracking', loadChildren: () => import('../../web/industries/vehicle-tracking/vehicle-tracking.module').then(m => m.VehicleTrackingModule) },
  { path: 'industries/livestock', loadChildren: () => import('../../web/industries/livestock/livestock.module').then(m => m.LivestockModule) },
  { path: 'service-details', loadChildren: () => import('../../web/services/service-details/service-details.module').then(m => m.ServiceDetailsModule) },
  { path: 'achievements', loadChildren: () => import('../../web/achievements/achievements.module').then(m => m.AchievementsModule) },
  { path: 'csr', loadChildren: () => import('../../web/csr/csr.module').then(m => m.CsrModule) },
  { path: 'gallery', loadChildren: () => import('../../web/gallery/gallery.module').then(m => m.GalleryModule) },
  // { path: 'industries/:id', loadChildren: () => import('../../web/industries/industries.module').then(m => m.IndustriesModule) },
  { path: 'login', loadChildren: () => import('../../web/login/login.module').then(m => m.LoginModule) , canActivate: [NoAuthGuardService]},
  { path: 'sitemap', loadChildren: () => import('../../web/sitemap/sitemap.module').then(m => m.SitemapModule) },
  { path: 'privacy-policy', loadChildren: () => import('../../web/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebLayoutRoutingModule { }
