import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  private returnUrl: string;
  public correctCredentials: boolean;
  public submitted: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router) {
  }

  public ngOnInit() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.returnUrl = '/login';
    this.submitted = false;
  }
  public onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }
}
