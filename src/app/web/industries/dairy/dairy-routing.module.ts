import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DairyComponent } from './dairy.component';

const routes: Routes = [{ path: '', component: DairyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DairyRoutingModule { }
