import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsLeadsComponent } from './contact-us-leads.component';

const routes: Routes = [{ path: '', component: ContactUsLeadsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsLeadsRoutingModule { }
