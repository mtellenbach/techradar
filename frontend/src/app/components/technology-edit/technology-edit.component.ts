import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Technology} from "../../models/technology.type";
import {User} from "../../models/user.type";

@Component({
    selector: 'app-technology-edit',
    templateUrl: './technology-edit.component.html',
    styleUrl: './technology-edit.component.css'
})
export class TechnologyEditComponent {
    technology: Technology | null = null;
    name: string = "";
    description: string = "";
    maturity: string = "";
    type: string = "";
    is_published: string = "";
    user: User | null = this.auth.getCurrentUser();
    id: string = "";
    organisation_id: string = "";

    constructor(private auth: AuthService, private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.getTechnology()
    }

    getTechnology() {
        const endpoint = `http://localhost:3000/technologies/${this.activatedRoute.snapshot.params['id']}`;

        let res = this.http.get<Technology>(endpoint, {headers: this.auth.getHeaders()});

        res.pipe().subscribe((technology: Technology) => {
            this.technology = technology;
            this.name = technology.name;
            this.description = technology.description;
            this.maturity = technology.maturity;
            this.type = technology.type;
            this.is_published = technology.is_published;
            this.id = technology._id;
            this.organisation_id = technology.organisation_id;
        }, error => {
            console.error(error)
        })
    }

    onSubmit() {
        const endpoint = `http://localhost:3000/technologies`;

        const body = {
            name: this.name,
            description: this.description,
            maturity: this.maturity,
            type: this.type,
            is_published: this.is_published,
            user_id: this.user?._id,
            _id: this.id,
            organisation_id: this.organisation_id
        };

        const res = this.http.put<Technology>(endpoint, body, {headers: this.auth.getHeaders()}).subscribe({
            next: technology => {
                this.router.navigate([`/technology/detail/${technology._id}`])
            },
            error: error => {
                console.error(`Error trying to update ${this.technology?.name}`, error);
            }
        });
    }
}
