import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MahaminingSystemComponent } from './mahamining-system.component';

const routes: Routes = [{ path: '', component: MahaminingSystemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MahaminingSystemRoutingModule { }
