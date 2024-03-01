import {Component} from '@angular/core';
import {User} from "./models/user.type";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    user: User | null = null;
    isLoggedIn = false;
    private subscription: Subscription;

    constructor(private auth: AuthService, private router: Router) {
        this.subscription = this.auth.loggedIn.subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;
            if (!this.isLoggedIn) {
              this.user = null;
              this.router.navigate(['/']);
            } else {
              this.user = this.auth.getCurrentUser();
            }
        });
    }

    ngOnInit() {
      this.subscription = this.auth.loggedIn.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        if (!this.isLoggedIn) {
          this.user = null;
          this.router.navigate(['/']);
        } else {
          this.user = this.auth.getCurrentUser();
        }
      });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onLogout() {
        this.auth.logout();
        this.user = null;
        this.subscription = this.auth.loggedIn.subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;
            if (!this.isLoggedIn) {
                this.user = this.auth.getCurrentUser();
                this.router.navigate(['/']);
            }
        });
    }
}
