import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelExecuteProposalComponent } from './cancel-execute-proposal.component';

const routes: Routes = [
  { path: '', component: CancelExecuteProposalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelExecuteProposalRoutingModule {}
