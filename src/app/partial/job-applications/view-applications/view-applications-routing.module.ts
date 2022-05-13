import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewApplicationsComponent } from './view-applications.component';

const routes: Routes = [{ path: '', component: ViewApplicationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewApplicationsRoutingModule { }
