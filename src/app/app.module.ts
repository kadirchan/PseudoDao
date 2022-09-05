import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectWalletComponent } from './components/connect-wallet/connect-wallet.component';
import { ProposalsComponent } from './components/proposals/proposals.component';
import { BalanceComponent } from './components/balance/balance.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectWalletComponent,
    ProposalsComponent,
    BalanceComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: Window, useValue: window }], // window object
  bootstrap: [AppComponent],
})
export class AppModule {}
