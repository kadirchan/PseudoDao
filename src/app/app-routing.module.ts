import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { CancelExecuteProposalComponent } from './components/cancel-execute-proposal/cancel-execute-proposal.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SubmitProposalComponent } from './components/submit-proposal/submit-proposal.component';
import { VoteComponent } from './components/vote/vote.component';

const routes: Routes = [
  { path: 'vote', component: VoteComponent },
  { path: 'add-member', component: AddMemberComponent },
  { path: 'submit-proposal', component: SubmitProposalComponent },
  {
    path: 'cancel-execute-proposal',
    component: CancelExecuteProposalComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
export const routingComponents = [
  VoteComponent,
  AddMemberComponent,
  SubmitProposalComponent,
  CancelExecuteProposalComponent,
  PageNotFoundComponent,
];
