import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { CalenderComponent } from "./calender/calender.component";
import { CasesComponent } from "./cases/cases.component";
import { ChatroomComponent } from "./chatroom/chatroom.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { SearchComponent } from "./search/search.component";
import { SignupFormComponent } from "./signup-form/signup-form.component";
import { TaskCreateComponent } from "./task-create/task-create.component";
import { TaskComponent } from "./task/task.component";
import { TeamsComponent } from "./teams/teams.component";
import { TestComponent } from "./test/test.component";
import { CaseCreateComponent } from "./case-create/case-create.component";

const routes:Routes = [

  {path: 'dashboard', component: DashboardComponent},
  {path: 'calender',component: CalenderComponent},
  {path: 'task',component: TaskComponent},
  {path: 'cases',component: CasesComponent},
  {path: 'teams',component: TeamsComponent},
  {path: 'search',component: SearchComponent},
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'test', component: TestComponent },
  { path: 'task-create', component: TaskCreateComponent },
  { path: 'case-create', component: CaseCreateComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule{}
