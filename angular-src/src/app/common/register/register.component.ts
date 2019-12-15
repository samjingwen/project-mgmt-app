import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { MustMatch } from "src/app/validators/must-match.validator";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirm: ["", [Validators.required]]
      },
      { validator: MustMatch("password", "confirm") }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  processForm() {
    this.submitted = true;

    if (this.registerForm.valid) {
      const values = this.registerForm.value;
      console.log(values);
      const user = {
        email: values.email,
        password: values.password,
        confirm: values.confirm
      };
      this.authService.register(user).subscribe(() => {
        this.router.navigate(["/boards"]);
      });
    }
  }
}
