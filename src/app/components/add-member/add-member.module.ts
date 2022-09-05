import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMemberRoutingModule } from './add-member-routing.module';
import { AddMemberComponent } from './add-member.component';
@NgModule({
  imports: [CommonModule, AddMemberRoutingModule],
  declarations: [AddMemberComponent],
})
export class VoteModule {}
