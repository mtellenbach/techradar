import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.type";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentUser: User|null = this.auth.getCurrentUser();

  technologies: Array<Technology>|null;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

  getTechnologies() {
    let endpoint: string|null = "http://localhost:3000/technologies/getByOrg";
    let body: object|null = { organisation_id: this.currentUser?.organisationId };
    if (this.currentUser?.role === "sysadmin") {
      endpoint = "http://localhost:3000/technologies/";
      body = null;
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth.getToken() });

    this.http.post<any>(endpoint, body)
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
