import { Component } from "@angular/core";
import { AuthService } from './auth/auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  items = [
    { label: "Main Table", routerLink: "/boards/table", icon: ["fas", "table"] },
    { label: "Kanban", routerLink: "/boards/kanban", icon: ["fab", "trello"] }
  ];
  activeLink = this.items[0].label;



  currentUser: string;
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
        this.currentUser = this.authService.loggedInUser;
      } else {
        this.isLoggedIn = false;
        this.currentUser = null;
      }
    });
  }

  

  signOut() {
    this.authService.signOut();
  }
}
