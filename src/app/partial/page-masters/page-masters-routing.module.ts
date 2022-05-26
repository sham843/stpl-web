import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageMastersComponent } from './page-masters.component';

const routes: Routes = [{ path: '', component: PageMastersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageMastersRoutingModule { }
