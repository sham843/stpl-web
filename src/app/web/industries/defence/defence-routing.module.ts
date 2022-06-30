import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefenceComponent } from './defence.component';

const routes: Routes = [{ path: '', component: DefenceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefenceRoutingModule { }
