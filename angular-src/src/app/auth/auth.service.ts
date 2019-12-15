import { Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  signInUser(email: string, password: string) {
    const options = {
      params: new HttpParams().set("email", email).set("password", password),
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    };

    return this.http.post(`/api/user/authenticate`, {}, options).pipe(
      tap(result => {
        this.setSession(result);
      }),
      tap(() => {
        this.isLoggedIn$.next(true);
      })
    );
  }

  signOut() {
    localStorage.removeItem("bearer_jwt_token");
    this.isLoggedIn$.next(false);
    this.router.navigate(["/"]);
  }

  register(user) {
    const options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      ),
      params: new HttpParams()
        .set("email", user.email)
        .set("password", user.password)
        .set("confirm", user.confirm)
    };
    return this.http.post(`/api/user/register`, {}, options);
  }

  private setSession(authResult) {
    localStorage.setItem("bearer_jwt_token", JSON.stringify(authResult));
  }

  isLoggedIn() {
    console.log(new Date().getTime() / 1000);
    console.log(this.expiresAt);
    return new Date().getTime() / 1000 < this.expiresAt;
    // return true;
  }

  get expiresAt() {
    const token = localStorage.getItem("bearer_jwt_token");
    if (token) {
      return JSON.parse(token)["expires_at"];
    }
    return 0;
  }

  get currentUserId() {
    const token = localStorage.getItem("bearer_jwt_token");
    if (token) {
      return JSON.parse(token)["user_id"];
    }
    return false;
  }

  get loggedInUser() {
    const token = localStorage.getItem("bearer_jwt_token");
    if (token) {
      return JSON.parse(token)["display_name"];
    }
    return false;
  }

  get authorizationToken() {
    const token = localStorage.getItem("bearer_jwt_token");
    if (token) {
      return JSON.parse(token)["access_token"];
    }
    return false;
  }
}
