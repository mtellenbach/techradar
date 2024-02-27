import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()){
      this.router.navigate(['/dashboard'])
    }
  }

  login() {
    this.http.post<any>('http://localhost:3000/users/login', { username: this.username, password: this.password })
      .subscribe(
        response => {
          const token = response.token;
          localStorage.setItem('token', token);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Login failed:', error);
        }
      );
  }
}
