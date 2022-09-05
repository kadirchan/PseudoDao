import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'vote',
    loadChildren: () =>
      import('./components/vote/vote.module').then((m) => m.VoteModule),
  },
  {
    path: 'submit-proposal',
    loadChildren: () =>
      import('./components/submit-proposal/submit-proposal.module').then(
        (m) => m.SubmitProposalModule
      ),
  },
  {
    path: 'cancel-execute-proposal',
    loadChildren: () =>
      import(
        './components/cancel-execute-proposal/cancel-execute-routing.module'
      ).then((m) => m.CancelExecuteProposalRoutingModule),
  },
  {
    path: 'add-member',
    loadChildren: () =>
      import('./components/add-member/add-member-routing.module').then(
        (m) => m.AddMemberRoutingModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./components/page-not-found/page-not-found-routing.module').then(
        (m) => m.PageNotFoundRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
