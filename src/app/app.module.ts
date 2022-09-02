import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectWalletComponent } from './components/connect-wallet/connect-wallet.component';
// import { SubmitProposalComponent } from './components/submit-proposal/submit-proposal.component';
import { ProposalsComponent } from './components/proposals/proposals.component';
import { BalanceComponent } from './components/balance/balance.component';
// import { VoteComponent } from './components/vote/vote.component';
// import { AddMemberComponent } from './components/add-member/add-member.component';
// import { CancelExecuteProposalComponent } from './components/cancel-execute-proposal/cancel-execute-proposal.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectWalletComponent,
    // SubmitProposalComponent,
    ProposalsComponent,
    routingComponents,
    BalanceComponent,
    // VoteComponent,
    // AddMemberComponent,
    // CancelExecuteProposalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: Window, useValue: window }], // window object
  bootstrap: [AppComponent],
})
export class AppModule {}
