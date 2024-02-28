import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private http: HttpClient, private router: Router, private auth: AuthService, private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    }

    login() {
        if (this.loginForm.valid) {
            const username = this.loginForm.get('username')?.value;
            const password = this.loginForm.get('password')?.value;
            this.auth.login({ username, password });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }

  isFieldValid(field: string) {
    const formControl = this.loginForm.get(field);
    return formControl?.touched && formControl.invalid;
  }

  getErrorMessage(field: string) {
    const formControl = this.loginForm.get(field);
    if (formControl?.hasError('required')) {
      return 'Dieses Feld ist erforderlich';
    }
    return;
  }
}
