import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Organisation} from "../../models/organisation.type";
import {User} from "../../models/user.type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environments";

@Component({
    selector: 'app-technology-create',
    templateUrl: './technology-create.component.html',
    styleUrl: './technology-create.component.css'
})
export class TechnologyCreateComponent {
    apiUrl = environment.apiUrl;
    user: User | null = this.auth.getCurrentUser();
    organisation_id: string | undefined = "";
    organisations: Organisation[] = [];

    technologyForm: FormGroup;

    constructor(private auth: AuthService, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) {
      this.technologyForm = this.formBuilder.group({
        user_id: [this.auth.getCurrentUser()?._id, Validators.required],
        name: ['', Validators.required],
        maturity: ['', Validators.required],
        type: ['', Validators.required],
        description: ['', Validators.required],
        decision: [''],
        is_published: [''],
        created_at: [Date.now()]
      });
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
        let endpoint = `${this.apiUrl}/organisations/`;

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

      if (this.technologyForm.valid) {
        const body = {
          user_id: this.auth.getCurrentUser()?._id,
          organisation_id: this.auth.getCurrentUser()?.organisation_id,
          name: this.technologyForm.get('name')?.value,
          maturity: this.technologyForm.get('maturity')?.value,
          type: this.technologyForm.get('type')?.value,
          description: this.technologyForm.get('description')?.value,
          decision: this.technologyForm.get('decision')?.value,
          is_published: this.technologyForm.get('is_published')?.value || false
        }

        const res = this.http.post<any>(`${this.apiUrl}/technologies/create`, body, {headers: this.auth.getHeaders()});
        res.pipe().subscribe(
          response => {
            const id = response._id;
            this.router.navigate([`/technology/detail/${id}`]);
          },
          error => {
            console.error('Failed to create technology:', error);
          }
        );
      } else {
        this.technologyForm.markAllAsTouched();
      }
    }

  isFieldValid(field: string) {
    const formControl = this.technologyForm.get(field);
    return formControl?.touched && formControl.invalid;
  }

  getErrorMessage(field: string) {
    const formControl = this.technologyForm.get(field);
    if (formControl?.hasError('required')) {
      return 'Dieses Feld ist erforderlich';
    }
    return;
  }
}
