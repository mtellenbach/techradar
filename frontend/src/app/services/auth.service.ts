import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../models/user.type";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    jwtHelper: JwtHelperService = new JwtHelperService();
    token: string | null = localStorage.getItem('token');
    user: User | null = this.jwtHelper.decodeToken(this.token ? this.token : "");

    constructor(private router: Router) {
    }

    getCurrentUser(): User | null {
        return this.user;
    }

    getToken(): string {
        return this.token === null ? "" : this.token;
    }

    isLoggedIn(): boolean {
        if (!this.getCurrentUser()) {
            this.router.navigate(['/']);
            return false;
        }
        if (this.jwtHelper.isTokenExpired(this.token)) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }

    isPermitted(roles: Array<string>): void {
        if (!this.getCurrentUser()) {
            this.router.navigate(['/']);
        }
        if (!this.getCurrentUser()?._role) {
            this.router.navigate(['/']);
        }
        if (!roles.includes(<string>this.user?._role)) {
            this.router.navigate(['/dashboard']);
        }
    }

    parseToken(token: string) {
        const jwtHelper = new JwtHelperService();
        return jwtHelper.decodeToken(token)
    }
}
