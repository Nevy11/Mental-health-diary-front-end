import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiaryComponent } from './diary/diary.component';
import { AIComponent } from './ai/ai.component';
import { GoalComponent } from './goal/goal.component';
import { SettingsComponent } from './settings/settings.component';

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
  { path: '', redirectTo: 'sign up', pathMatch: 'full' },
  {
    path: 'diary',
    component: DiaryComponent,
  },
  {
    path: ' AI',
    component: AIComponent,
  },
  {
    path: ' Goal',
    component: GoalComponent,
  },
  {
    path: 'Settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
