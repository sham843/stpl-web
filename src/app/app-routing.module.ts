import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthorizationGuard } from './core/auth/authorization.guard';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { PartialLayoutComponent } from './partial/partial-layout/partial-layout.component';
import { WebLayoutComponent } from './web/web-layout/web-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: WebLayoutComponent,  loadChildren: () => import('./web/web-layout/web-layout.module').then(m => m.WebLayoutModule) },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthorizationGuard],
    component: PartialLayoutComponent,
    loadChildren: () => import('./partial/partial-layout/partial-layout.module').then(m => m.PartialLayoutModule)
  },
  { path: 'defence', loadChildren: () => import('./web/industries/defence/defence.module').then(m => m.DefenceModule) },
  { path: 'dairy', loadChildren: () => import('./web/industries/dairy/dairy.module').then(m => m.DairyModule) },
  { path: 'election', loadChildren: () => import('./web/industries/election/election.module').then(m => m.ElectionModule) },
  { path: 'mining', loadChildren: () => import('./web/industries/mining/mining.module').then(m => m.MiningModule) },
  { path: 'vehicle-tracking', loadChildren: () => import('./web/industries/vehicle-tracking/vehicle-tracking.module').then(m => m.VehicleTrackingModule) },
  { path: 'livestock', loadChildren: () => import('./web/industries/livestock/livestock.module').then(m => m.LivestockModule) },
  
  
  
  
  
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
