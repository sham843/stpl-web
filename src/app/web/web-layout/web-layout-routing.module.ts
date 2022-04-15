import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../../web/home/home.module').then(m => m.HomeModule) },
  { path: 'discover-us', loadChildren: () => import('../../web/about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'contact-us', loadChildren: () => import('../../web/contact-us/contact-us.module').then(m => m.ContactUsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebLayoutRoutingModule { }
