import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmitProposalRoutingModule } from './submit-proposal-routing.module';
import { SubmitProposalComponent } from './submit-proposal.component';

@NgModule({
  imports: [CommonModule, SubmitProposalRoutingModule],
  declarations: [SubmitProposalComponent],
})
export class SubmitProposalModule {}
