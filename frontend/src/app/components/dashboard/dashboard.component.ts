import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.type";
import {Technology} from "../../models/technology.type";
import {map, Observable, toArray} from "rxjs";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    currentUser: User | null = this.auth.getCurrentUser();

    technologies: Technology[] | null = null;

    constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
    }

    ngOnInit() {
        if (!this.currentUser && this.auth.isLoggedIn()) {
            this.router.navigate(['/']);
        }
        // @ts-ignore
        let endpoint: string | null = `http://localhost:3000/technologies/getByOrg/${this.currentUser['organisation_id']}}`;
        // @ts-ignore
        if (this.currentUser['role'] === "sysadmin") {
            endpoint = "http://localhost:3000/technologies/";
        }

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.auth.getToken()
        });

        this.http.get<Technology[]>(endpoint, {headers: headers})
            .subscribe((technologyArray: Technology[]) => {
                   this.technologies = technologyArray
                console.log(this.technologies)
                },
                (error) => {
                    console.error('Error:', error);
                }
            );
    }

}
