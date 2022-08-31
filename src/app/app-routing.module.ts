import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VoteComponent } from './components/vote/vote.component';

const routes: Routes = [
  { path: '/vote', component: VoteComponent },
  {
    path: 'todos',
    component: AppComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
