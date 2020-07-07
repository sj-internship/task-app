import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm : FormGroup;
  returnUrl: string;
  correctCredentials:boolean;
  submitted:boolean;
  constructor(
    private fb : FormBuilder, 
    private authenticationService: AuthenticationService, 
    private router: Router) 
    {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName : ['', Validators.required],
      password:['', [Validators.required, Validators.minLength(6)]]
    });
    this.returnUrl = '/tasks';
    this.submitted = false;
  }
  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.correctCredentials = this.authenticationService.login(this.loginForm.value.userName, this.loginForm.value.password);

    if(this.correctCredentials){
      this.router.navigate([this.returnUrl]);
    }
  }

}
