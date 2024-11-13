import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiaryComponent } from './diary/diary.component';
import { AIComponent } from './ai/ai.component';
import { GoalComponent } from './goal/goal.component';
import { SettingsComponent } from './settings/settings.component';
import { TestComponent } from './test/test.component';
import { LoginGuard } from './guards/login.guard';
import { MicDialogueComponent } from './diary/mic-dialogue/mic-dialogue.component';

export const routes: Routes = [
  {
    path: 'sign up',
    component: SignUpComponent,
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [LoginGuard],
  },
  { path: '', redirectTo: 'sign up', pathMatch: 'full' },
  {
    path: 'Diary',
    component: DiaryComponent,
    // canActivate: [LoginGuard],
  },
  {
    path: 'Mental AI',
    component: AIComponent,
    // canActivate: [LoginGuard],
  },
  {
    path: 'Track Goal',
    component: GoalComponent,
    // canActivate: [LoginGuard],
  },
  {
    path: 'Settings',
    component: SettingsComponent,
    // canActivate: [LoginGuard],
  },
  {
    path: 'test',
    component: TestComponent,
    // canActivate: [LoginGuard],
  },
  {
    path: 'Mic Diary',
    component: MicDialogueComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
