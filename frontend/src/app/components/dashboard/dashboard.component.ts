import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.type";
import {Technology} from "../../models/technology.type";
import {catchError, map, Observable, toArray} from "rxjs";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    technologies: Technology[] | null = null;

    constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
    }

    ngOnInit() {
        if (!this.auth.getCurrentUser() && this.auth.isLoggedIn()) {
            this.router.navigate(['/']);
        }
        // @ts-ignore
        let endpoint: string | null = `http://localhost:3000/technologies/getByOrg/${this.auth.getCurrentUser()?.organisation_id?._id}`;

        // @ts-ignore
        if (this.auth.getCurrentUser()?.role  === "sysadmin") {
            endpoint = "http://localhost:3000/technologies/";
        }

        if (this.auth.getCurrentUser()?.role === 'user') {
            // @ts-ignore
            endpoint = `http://localhost:3000/technologies/getByOrg/${this.auth.getCurrentUser()?.organisation_id?._id}/isPublished`
        }
        console.log(this.auth.getCurrentUser())

        let res = this.http.get<Technology[]>(endpoint, {headers: this.auth.getHeaders()});

        res.pipe().subscribe((technologies: Technology[]) => {
            this.technologies = technologies;
        })
    }

}
