import {Component} from '@angular/core';
import {Technology} from "../../models/technology.type";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user.type";

@Component({
    selector: 'app-technology-detail',
    templateUrl: './technology-detail.component.html',
    styleUrl: './technology-detail.component.css'
})
export class TechnologyDetailComponent {
    technology: Technology | null = null;
    user: User | null;
    type: string | null = null;
    maturity: string | null = null;

    constructor(private auth: AuthService, private http: HttpClient, private activatedRoute: ActivatedRoute) {
        this.user = auth.getCurrentUser()
    }

    ngOnInit() {
        const endpoint = `http://localhost:3000/technologies/${this.activatedRoute.snapshot.params['id']}`;
        this.http.get<Technology>(endpoint, {headers: this.auth.getHeaders()})
            .subscribe((technology: Technology) => {
                    this.technology = {
                        _id: technology._id,
                        technology_id: technology.technology_id,
                        organisation_id: technology.organisation_id,
                        user_id: technology.user_id,
                        name: technology.name,
                        maturity: technology.maturity,
                        type: technology.type,
                        description: technology.description,
                        decision: technology.decision,
                        is_published: technology.is_published,
                        created_at: technology.created_at,
                        updated_at: technology.updated_at,
                        deleted_at: technology.deleted_at,
                        changelogs: technology.changelogs,
                    }
                  switch (this.technology.type.toString()) {
                    case "1":
                      this.type = "Techniques";
                      break;
                    case "2":
                      this.type = "Tools";
                      break;
                    case "3":
                      this.type = "Platforms";
                      break;
                    case "4":
                      this.type = "Language & Frameworks";
                      break;
                    default:
                      this.type = "undefined";
                      break;
                  }

                  switch (this.technology.maturity.toString()) {
                    case "1":
                      this.maturity = "assess";
                      break;
                    case "2":
                      this.maturity = "trial";
                      break;
                    case "3":
                      this.maturity = "adopt";
                      break;
                    case "4":
                      this.maturity = "hold";
                      break;
                    default:
                      this.maturity = "undefined";
                      break;
                  }
                },
                (error) => {
                    console.error('Error:', error);
                }
            );
    }
}
