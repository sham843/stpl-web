import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DairyVetSoftwareComponent } from './dairy-vet-software.component';

const routes: Routes = [{ path: '', component: DairyVetSoftwareComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DairyVetSoftwareRoutingModule { }
