import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  private returnUrl: string;
  public correctCredentials: boolean;
  public submitted: boolean;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {

  }

  public ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.returnUrl = '/tasks';
    this.submitted = false;
  }
  public onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error=>{
        console.log('err')
      }
    )
  }
}
