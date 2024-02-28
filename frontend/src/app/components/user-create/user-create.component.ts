import { Component } from '@angular/core';
import {User} from "../../models/user.type";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Organisation} from "../../models/organisation.type";
import {environment} from "../../../environments/environments";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
    apiUrl = environment.apiUrl;
    currentUser: User | null = null;
    username: string = "";
    password: string = "";
    email: string = "";
    user_id: string = "";
    role: string = "";
    organisation_id: string | undefined = "";

    organisations: Organisation[] | null = null;

    constructor(private auth: AuthService, private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) {
        this.currentUser = this.auth.getCurrentUser();
        if (this.auth.getCurrentUser()?.role === 'sysadmin') {
            this.getOrganisations();
        }

        if (this.auth.getCurrentUser()?.role === "sysadmin") {
            this.getOrganisations()
        } else {
            this.organisation_id = this.auth.getCurrentUser()?.organisation_id?._id
        }
    }

    ngOnInit() {
        this.auth.isPermitted(['sysadmin', 'cto', 'techlead']);
    }

    onSubmit() {
        const endpoint = `${this.apiUrl}/users/create`
        const body = {
            username: this.username,
            password: this.password,
            organisation_id: this.organisation_id,
            role: this.role,
            email: this.email
        }
        const res = this.http.post<any>(endpoint, body, {headers: this.auth.getHeaders()});
        res.pipe().subscribe(res => {
                console.log(res);
                this.router.navigate([`/users`]);
            }, error => {
                console.error(error)
            })
    }

    getOrganisations() {
        const res = this.http.get<Organisation[]>(`${this.apiUrl}/organisations`, {headers: this.auth.getHeaders()});
        res.pipe().subscribe((organisations: Organisation[]) => {
            this.organisations = organisations;
        }, error => {
            console.error(error);
        })
    }
}
