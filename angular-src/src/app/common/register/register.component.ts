import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirm: ["", Validators.required]
    })
  }

  processForm(){
    if (this.registerForm.valid){
      const values = this.registerForm.value;
      console.log(values);
      const user = {
        email: values.email,
        password: values.password
      }
      this.authService.register(user).subscribe();
    }
  }

}
