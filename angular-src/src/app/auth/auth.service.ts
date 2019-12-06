import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  HttpParams,
  HttpHeaderResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signInUser(email: string, password: string) {
    const params = new HttpParams()
      .set("email", email)
      .set("password", password);
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this.http.post("/api/user/authenticate", params.toString(), {
      headers
    });
  }

  signOut() {
    localStorage.removeItem("bearer_jwt_token");
    this.router.navigate(["/"]);
  }

  getAuthorizationToken() {
    if (localStorage.getItem("bearer_jwt_token")) {
      return localStorage.getItem("bearer_jwt_token");
    }
  }
}
