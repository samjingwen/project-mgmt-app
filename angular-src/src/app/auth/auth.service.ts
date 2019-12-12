import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  signInUser(email: string, password: string) {
    const params = new HttpParams()
      .set("email", email)
      .set("password", password);
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this.http
      .post("/api/user/authenticate", params.toString(), {
        headers
      })
      .pipe(
        tap(result => {
          this.setSession(result);
        })
      );
  }

  signOut() {
    localStorage.removeItem("bearer_jwt_token");
    this.router.navigate(["/"]);
  }

  register(user) {
    const params = new HttpParams()
      .set("email", user.email)
      .set("password", user.password);
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    };
    return this.http.post(`${this.apiUrl}/user/register`, params.toString(), options);
  }

  private setSession(authResult) {
    localStorage.setItem("bearer_jwt_token", JSON.stringify(authResult));
  }

  isLoggedIn() {
    console.log(new Date().getTime() / 1000);
    console.log(this.getExpiration());
    return new Date().getTime() / 1000 < this.getExpiration();
    // return true;
  }

  getExpiration() {
    const token = localStorage.getItem("bearer_jwt_token");
    if (token) {
      return JSON.parse(token)["expires_at"];
    }
    return 0;
  }

  getAuthorizationToken() {
    const token = localStorage.getItem("bearer_jwt_token");
    if (token) {
      return JSON.parse(token)["access_token"];
    }
  }
}
