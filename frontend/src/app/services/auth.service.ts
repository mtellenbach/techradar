import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../models/user.type";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Organisation} from "../models/organisation.type";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    jwtHelper: JwtHelperService = new JwtHelperService();
    token: string | null = localStorage.getItem('token');
    user: User | null = null;
    private is_loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private router: Router, private http: HttpClient) {
        this.setCurrentUser();
    }

    get loggedIn() {
        return this.is_loggedIn.asObservable();
    }

    setCurrentUser() {
        const contents = this.jwtHelper.decodeToken(this.token ? this.token : "");
        if (contents) {
            this.user = {
                _id: contents.id,
                user_id: contents.userId,
                role: contents.role,
                organisation_id: contents.organisation_id,
                username: null,
                email: null,
                organisation: null
            }
        } else {
            this.user = null;
        }
    }

    getCurrentUser(): User | null {
        if (this.user !== null) {
          this.is_loggedIn.next(true);
        }
        return this.user;
    }

    getToken(): string {
        return this.token === null ? "" : this.token;
    }

    isLoggedIn(): boolean {
        if (!this.getCurrentUser()) {
            this.router.navigate(['/']);
            this.is_loggedIn.next(false);
            return false;
        }
        if (this.jwtHelper.isTokenExpired(this.token)) {
            this.router.navigate(['/']);
            this.is_loggedIn.next(false);
            return false;
        }
        this.is_loggedIn.next(true);
        return true;
    }

    isPermitted(roles: Array<string>): void {
        if (!this.getCurrentUser()) {
            this.router.navigate(['/']);
        }
        if (!this.getCurrentUser()?.role) {
            this.router.navigate(['/']);
        }
        if (!roles.includes(<string>this.user?.role)) {
            this.router.navigate(['/dashboard']);
        }
    }

    parseToken(token: string) {
        const jwtHelper = new JwtHelperService();
        return jwtHelper.decodeToken(token)
    }

    getHeaders() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
    }

    login(body: object) {
        const res = this.http.post<any>('http://localhost:3000/users/login', body)
        res.pipe().subscribe(
            response => {
                const token = response.token;
                localStorage.setItem('token', token);
                this.token = token;
                this.setCurrentUser();
                this.router.navigate(['/dashboard']);
                this.is_loggedIn.next(true);
            },
            error => {
                console.error('Login failed:', error);
            }
        );
    }
    logout() {
        localStorage.removeItem('token');
        this.user = null;
        this.is_loggedIn.next(false);
    }
}
