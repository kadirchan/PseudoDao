import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoteRoutingModule } from './vote-routing.module';
import { VoteComponent } from './vote.component';
@NgModule({
  imports: [CommonModule, VoteRoutingModule],
  declarations: [VoteComponent],
})
export class VoteModule {}
