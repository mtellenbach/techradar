import {Component, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user.type";
import {Technology} from "../../models/technology.type";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Organisation} from "../../models/organisation.type";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
    currentUser: User | null = null;
    username: string | null = "";
    password: string = "";
    email: string | null = "";
    user_id: string = "";
    role: string = "";
    organisation_id: Organisation | null | undefined = null;
    organisation: Organisation | null = null;

    organisations: Organisation[] | null = null;

    constructor(private auth: AuthService, private router: Router, private http: HttpClient, private activatedRoute: ActivatedRoute) {
        this.currentUser = this.auth.getCurrentUser();
        if (this.auth.getCurrentUser()?.role === 'sysadmin') {
            this.getOrganisations();
        }

        if (this.auth.getCurrentUser()?.role === "sysadmin") {
            this.getOrganisations()
        } else {
            this.organisation_id = this.auth.getCurrentUser()?.organisation_id
        }
    }

    ngOnInit() {
        this.auth.isPermitted(['sysadmin', 'cto', 'techlead']);

        const endpoint = `http://localhost:3000/users/${this.activatedRoute.snapshot.params['id']}`;
        const res = this.http.get<User>(endpoint, {headers: this.auth.getHeaders()});
        res.pipe().subscribe((user: User) => {
                this.user_id = user.user_id;
                this.role = user.role;
                this.username = user.username;
                this.email = user.email;
                this.organisation_id = user.organisation_id;
            }, error => {
                console.error(error);
            });
    }

    onSubmit() {
        const endpoint = `http://localhost:3000/users`
        const body = {
            username: this.username,
            password: this.password,
            organisation_id: this.organisation_id,
            role: this.role,
            email: this.email
        }

        const res = this.http.put<User>(endpoint, body, {headers: this.auth.getHeaders()})

        res.pipe().subscribe((user: User) => {
            this.router.navigate([`/users`]);
        }, error => {
            console.error(error)
        })
    }

    getOrganisations() {
        const res = this.http.get<Organisation[]>('http://localhost:3000/organisations', {headers: this.auth.getHeaders()});
        res.pipe().subscribe((organisations: Organisation[]) => {
            this.organisations = organisations;
        }, error => {
            console.error(error);
        })
    }

    protected readonly JSON = JSON;
}
