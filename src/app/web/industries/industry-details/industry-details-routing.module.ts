import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustryDetailsComponent } from './industry-details.component';

const routes: Routes = [{ path: '', component: IndustryDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryDetailsRoutingModule { }
