import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancelExecuteProposalRoutingModule } from './cancel-execute-routing.module';
import { CancelExecuteProposalComponent } from './cancel-execute-proposal.component';

@NgModule({
  imports: [CommonModule, CancelExecuteProposalRoutingModule],
  declarations: [CancelExecuteProposalComponent],
})
export class CancelExecuteProposalModule {}
