import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../models/user.type";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string|null = localStorage.getItem('token');

  constructor(private authService: AuthService, private router: Router) {}

  getCurrentUser(): User|null {
    const jwtHelper = new JwtHelperService();
    if (!this.token) {
      return null;
    }
    const contents = jwtHelper.decodeToken(this.token)
    return new User(contents.userId, contents.role, contents.organisation_id);
  }

  getToken():string {
    return this.token === null ? "" : this.token;
  }

  isPermitted(roles: Array<string>): boolean {
    if (!this.getCurrentUser()) {
      return false;
    }
    if (!this.getCurrentUser()?._role) {
      return false;
    }
    return roles.includes(<string>this.getCurrentUser()?._role);
  }

  parseToken(token: string) {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token)
  }
}
