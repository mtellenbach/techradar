import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Organisation} from "../../models/organisation.type";
import {User} from "../../models/user.type";

@Component({
    selector: 'app-technology-create',
    templateUrl: './technology-create.component.html',
    styleUrl: './technology-create.component.css'
})
export class TechnologyCreateComponent {
    user: User | null = this.auth.getCurrentUser();
    organisations: Organisation[] = [];
    organisation_id: string | undefined = "";
    user_id: string = "";
    name: string = "";
    maturity: string = "";
    type: string = "";
    description: string = "";
    is_published: string = "";
    created_at: string = "";

    constructor(private auth: AuthService, private router: Router, private http: HttpClient) {
    }

    ngOnInit() {
        if (!this.auth.isLoggedIn() && !this.auth.getCurrentUser()) {
            this.router.navigate(['/dashboard'])
        }
        if (this.auth.getCurrentUser()?.role === "sysadmin") {
            this.getOrganisations()
        } else {
            this.organisation_id = this.auth.getCurrentUser()?.organisation_id?._id
        }
    }

    getOrganisations() {
        let endpoint = "http://localhost:3000/organisations/";

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.auth.getToken()
        });

        this.http.get<Organisation[]>(endpoint, {headers: headers})
            .subscribe((organisationsArray: Organisation[]) => {
                    this.organisations = organisationsArray
                },
                (error) => {
                    console.error('Error:', error);
                }
            );
    }

    onSubmit() {
        if (!this.auth.getCurrentUser()) {
            this.router.navigate(['/'])
        }

        const body = {
            user_id: this.auth.getCurrentUser()?._id,
            organisation_id: this.auth.getCurrentUser()?.organisation_id,
            name: this.name,
            maturity: this.maturity,
            type: this.type,
            description: this.description,
            is_published: this.is_published
        }

        const res = this.http.post<any>('http://localhost:3000/technologies/create', body, {headers: this.auth.getHeaders()});
        res.pipe().subscribe(
            response => {
                const id = response._id;
                this.router.navigate([`/technology/detail/${id}`]);
            },
            error => {
                console.error('Failed to create technology:', error);
            }
        );
    }
}
