import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Technology} from "../../models/technology.type";
import {User} from "../../models/user.type";
import {Organisation} from "../../models/organisation.type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environments";

@Component({
    selector: 'app-technology-edit',
    templateUrl: './technology-edit.component.html',
    styleUrl: './technology-edit.component.css'
})
export class TechnologyEditComponent {
    apiUrl = environment.apiUrl
    technology: Technology | null = null;
    user: User | null = this.auth.getCurrentUser();
    organisation_id: string | undefined = "";

  technologyForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.getTechnology()
    if (this.technology) {
      this.technologyForm = this.formBuilder.group({
        organisation_id: [this.technology.organisation_id, Validators.required],
        user_id: [this.technology.user_id, Validators.required],
        name: [this.technology.name, Validators.required],
        maturity: [this.technology.maturity, Validators.required],
        type: [this.technology.type, Validators.required],
        description: [this.technology.description, Validators.required],
        decision: [this.technology.decision],
        is_published: [this.technology.is_published],
        created_at: [this.technology.created_at]
      });
    } else {
      this.technologyForm = this.formBuilder.group({
        organisation_id: ['', Validators.required],
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
  }

    ngOnInit() {
        this.getTechnology()
    }

    getTechnology() {
        const endpoint = `${this.apiUrl}/technologies/${this.activatedRoute.snapshot.params['id']}`;

        let res = this.http.get<Technology>(endpoint, {headers: this.auth.getHeaders()});

        res.pipe().subscribe((technology: Technology) => {
            this.technology = technology;
            this.technologyForm = this.formBuilder.group({
              organisation_id: [this.technology.organisation_id, Validators.required],
              user_id: [this.technology.user_id, Validators.required],
              name: [this.technology.name, Validators.required],
              maturity: [this.technology.maturity, Validators.required],
              type: [this.technology.type, Validators.required],
              description: [this.technology.description, Validators.required],
              decision: [this.technology.decision],
              is_published: [this.technology.is_published],
              created_at: [this.technology.created_at]
            });
            console.log(this.technology)

        }, error => {
            console.error(error)
        })
    }

    onSubmit() {
        const endpoint = `${this.apiUrl}/technologies`;
        const body = {
          id: this.activatedRoute.snapshot.params['id'],
          user_id: this.technologyForm.get('user_id')?.value,
          organisation_id: this.technologyForm.get('organisation_id')?.value,
          name: this.technologyForm.get('name')?.value,
          maturity: this.technologyForm.get('maturity')?.value,
          type: this.technologyForm.get('type')?.value,
          description: this.technologyForm.get('description')?.value,
          decision: this.technologyForm.get('decision')?.value,
          is_published: this.technologyForm.get('is_published')?.value
        }

        const res = this.http.put<Technology>(endpoint, body, {headers: this.auth.getHeaders()}).pipe().subscribe((technology: Technology) => {
                console.log(technology)
                this.router.navigate([`/technology/detail/${technology._id}`])
            }, error => {
              console.error(error)
            });
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
