import { Component } from '@angular/core';
import {User} from "../../models/user.type";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environments";

@Component({
  selector: 'app-organisation-create',
  templateUrl: './organisation-create.component.html',
  styleUrl: './organisation-create.component.css'
})
export class OrganisationCreateComponent {

    apiUrl = environment.apiUrl;
    user: User | null = this.auth.getCurrentUser();
    name: string = "";

    constructor(private auth: AuthService, private router: Router, private http: HttpClient) {
    }

    ngOnInit() {
        if (!this.auth.isLoggedIn() && !this.auth.getCurrentUser()){
            this.router.navigate(['/'])
        }
        if (this.auth.getCurrentUser()?.role !== "sysadmin") {
            this.router.navigate(['/dashboard'])
        }
    }

    onSubmit() {
        const body = {
            name: this.name
        }
        this.http.post<any>(`${this.apiUrl}/organisations/create`, body, {headers: this.auth.getHeaders()})
            .subscribe(
                response => {
                    const id = response._id;
                    this.router.navigate([`/organisation/detail/${id}`]);
                },
                error => {
                    console.error('Failed to create organisation:', error);
                }
            );
    }

}
