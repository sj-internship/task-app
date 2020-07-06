import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'
import {AuthenticationService} from '../../../authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm : FormGroup;
  returnUrl: string;
  incorrectPassword:boolean;
  incorrectUserName:boolean;
  submitted:boolean;
  constructor(
    private fb : FormBuilder, 
    private authenticationService: AuthenticationService, 
    private router: Router,
    private route: ActivatedRoute,) 
    {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName : ['', Validators.required],
      password:['', [Validators.required, Validators.minLength(6)]]
    })
    this.returnUrl = '/tasks'
    this.submitted = false;
  }
  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    const loginErrors = this.authenticationService.login(this.loginForm.value.userName, this.loginForm.value.password);
    this.incorrectUserName = loginErrors.incorrectUserName
    this.incorrectPassword = loginErrors.incorrectPassword
    if(!this.incorrectUserName && !this.incorrectPassword){
      this.router.navigate([this.returnUrl])
      console.log('Loggin in')
    }
  }

}
