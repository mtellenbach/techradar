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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'technology/:id', component: TechnologyDetailComponent },
  { path: 'technology/create', component: TechnologyCreateComponent },
  { path: 'technology/edit/:id', component: TechnologyEditComponent },
  { path: 'organisation', component: OrganisationListComponent },
  { path: 'organisation/create', component: OrganisationCreateComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/create', component: UserCreateComponent },
  { path: 'users/edit/:id', component: UserEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
