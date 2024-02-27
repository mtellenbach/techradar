import {Component, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/user.type";
import {Technology} from "../../models/technology.type";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  currentUser: User | null = this.auth.getCurrentUser();
  user: User | null = null;

  @Input() id = '';

  constructor(private auth: AuthService, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.auth.isPermitted(['sysadmin', 'cto']);

    const endpoint = `http://localhost:3000/user/${this.id}`;

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth.getToken()
    });

    this.http.get<User>(endpoint, {headers: headers})
      .subscribe((user: User) => {
          this.user = user;
        },
        (error) => {
          console.error('Error:', error);
        }
      );

    if (!this.checkOrganisation()) {
      this.router.navigate(['/users'])
    }
  }

  checkOrganisation() {
    if (this.currentUser?._organisation_id !== this.user?._organisation_id) {
      return false
    }
    return true;
  }
}
