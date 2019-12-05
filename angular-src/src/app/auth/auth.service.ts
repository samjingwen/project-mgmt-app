import { Injectable } from "@angular/core";
import { HttpClient } from "selenium-webdriver/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signInUser(email: string, password: string) {
    
  }
}
