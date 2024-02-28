import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {TechnologyCreateComponent} from "./components/technology-create/technology-create.component";
import {TechnologyEditComponent} from "./components/technology-edit/technology-edit.component";
import {TechnologyDetailComponent} from "./components/technology-detail/technology-detail.component";
import {OrganisationListComponent} from "./components/organisation-list/organisation-list.component";
import {OrganisationCreateComponent} from "./components/organisation-create/organisation-create.component";
import {UsersComponent} from "./components/users/users.component";
import {UserCreateComponent} from "./components/user-create/user-create.component";
import {UserEditComponent} from "./components/user-edit/user-edit.component";
import {OrganisationEditComponent} from "./components/organisation-edit/organisation-edit.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'technology/detail/:id', component: TechnologyDetailComponent },
  { path: 'technology/create', component: TechnologyCreateComponent },
  { path: 'technology/edit/:id', component: TechnologyEditComponent },
  { path: 'organisation', component: OrganisationListComponent },
  { path: 'organisation/create', component: OrganisationCreateComponent },
  { path: 'organisation/edit/:id', component: OrganisationEditComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/edit/:id', component: UserEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
