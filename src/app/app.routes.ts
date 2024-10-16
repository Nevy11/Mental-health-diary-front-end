import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashDividersComponent } from './dashboard/dash-dividers/dash-dividers.component';
import { ChatBotDividerComponent } from './dashboard/dash-dividers/chat-bot-divider/chat-bot-divider.component';
import { DiaryDividerComponent } from './dashboard/dash-dividers/diary-divider/diary-divider.component';
import { GoalDividerComponent } from './dashboard/dash-dividers/goal-divider/goal-divider.component';

export const routes: Routes = [
  {
    path: 'sign up',
    component: SignUpComponent,
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'diary divider',
    component: DiaryDividerComponent,
  },
  {
    path: 'chat bot divider',
    component: ChatBotDividerComponent,
  },
  {
    path: 'goal divider',
    component: GoalDividerComponent,
  },
  { path: '', redirectTo: 'sign up', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
