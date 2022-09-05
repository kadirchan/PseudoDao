import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitProposalComponent } from './submit-proposal.component';

const routes: Routes = [{ path: '', component: SubmitProposalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitProposalRoutingModule {}
