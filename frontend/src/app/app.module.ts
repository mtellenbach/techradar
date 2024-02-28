import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UsersComponent} from './components/users/users.component';
import {HttpClientModule} from "@angular/common/http";
import { TechnologyDetailComponent } from './components/technology-detail/technology-detail.component';
import { TechnologyEditComponent } from './components/technology-edit/technology-edit.component';
import { OrganisationListComponent } from './components/organisation-list/organisation-list.component';
import { OrganisationEditComponent } from './components/organisation-edit/organisation-edit.component';
import { OrganisationCreateComponent } from './components/organisation-create/organisation-create.component';
import { TechnologyCreateComponent } from './components/technology-create/technology-create.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import {AuthService} from "./services/auth.service";
import {User} from "./models/user.type";

registerLocaleData(localeDECH)
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        UsersComponent,
        TechnologyDetailComponent,
        TechnologyEditComponent,
        OrganisationListComponent,
        OrganisationEditComponent,
        OrganisationCreateComponent,
        TechnologyCreateComponent,
        UserCreateComponent,
        UserEditComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: LOCALE_ID, useValue: 'de-ch'}
    ]
})
export class AppModule {
}
