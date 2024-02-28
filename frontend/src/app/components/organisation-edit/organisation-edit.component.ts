import { Component } from '@angular/core';

import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Organisation} from "../../models/organisation.type";
import {environment} from "../../../environments/environments";

@Component({
  selector: 'app-organisation-edit',
  templateUrl: './organisation-edit.component.html',
  styleUrl: './organisation-edit.component.css'
})
export class OrganisationEditComponent {
    apiUrl = environment.apiUrl
    organisation: Organisation | null = null;
    id: string = "";
    name: string = "";

    constructor(private auth: AuthService, private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.getOrganisation()
    }

    getOrganisation() {
        const endpoint = `${this.apiUrl}/organisations/${this.activatedRoute.snapshot.params['id']}`;

        let res = this.http.get<Organisation>(endpoint, {headers: this.auth.getHeaders()});

        res.pipe().subscribe((organisation: Organisation) => {
            this.name = organisation.name;
            this.id = organisation._id;
        }, error => {
            console.error(error)
        })
    }

    onSubmit() {
        const endpoint = `${this.apiUrl}/organisations`;
        const body = {
            id: this.id,
            name: this.name
        }

        let res = this.http.put<Organisation>(endpoint, body,{headers: this.auth.getHeaders()});

        res.pipe().subscribe((organisation: Organisation) => {
            this.router.navigate([`/organisation`])
        }, error => {
            console.error(error)
        })
    }
}
