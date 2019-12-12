import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  MediaMatcher,
  BreakpointObserver,
  BreakpointState
} from "@angular/cdk/layout";
import {
  trigger,
  transition,
  style,
  animate,
  state
} from "@angular/animations";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  currentUser: string;
  isLoggedIn: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
        this.currentUser = this.authService.loggedInUser;
      } else{
        this.isLoggedIn = false;
        this.currentUser = null;
      }
    });
  }


  signOut(){
    this.authService.signOut();
  }

  ngOnDestroy(): void {}
}
