import { Component } from '@angular/core';
import {User} from "../../models/user.type";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Technology} from "../../models/technology.type";
import {environment} from "../../../environments/environments";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

    apiUrl = environment.apiUrl;
    users: User[] | undefined;

    constructor(private auth: AuthService, private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        this.getUsers();
    }

    private getUsers() {
        if (!this.auth.getCurrentUser() && this.auth.isLoggedIn()) {
            this.router.navigate(['/']);
        }
        if (this.auth.getCurrentUser()?.role === 'user') {
            this.router.navigate(['/dashboard']);
        }

        // @ts-ignore
        let endpoint: string | null = `${this.apiUrl}/users/getByOrg/${this.auth.getCurrentUser()?.organisation_id?._id}`;

        // @ts-ignore
        if (this.auth.getCurrentUser()?.role  === "sysadmin") {
            endpoint = `${this.apiUrl}/users`
        }

        const res = this.http.get<User[]>(endpoint, {headers: this.auth.getHeaders()});

        res.pipe().subscribe((users: User[]) => {
            this.users = users;
        }, error => {
            console.error(error);
            this.router.navigate(['/dashboard'])
        })

    }
}
