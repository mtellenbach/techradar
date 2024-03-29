import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Organisation} from "../../models/organisation.type";
import {environment} from "../../../environments/environments";

@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrl: './organisation-list.component.css'
})
export class OrganisationListComponent {
    apiUrl = environment.apiUrl
    organisations: Organisation[] | null = null;

    constructor(private auth: AuthService, private router: Router, private http: HttpClient) {
    }

    ngOnInit() {
        if(this.auth.getCurrentUser()?.role !== 'sysadmin') {
            this.router.navigate(['/dashboard']);
        }

        const endpoint = `${this.apiUrl}/organisations`;

        let res = this.http.get<Organisation[]>(endpoint, {headers: this.auth.getHeaders()});

        res.pipe().subscribe((organisations: Organisation[]) => {
            this.organisations = organisations;
        })
    }

}
