import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivestockComponent } from './livestock.component';

const routes: Routes = [{ path: '', component: LivestockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivestockRoutingModule { }
