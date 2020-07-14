import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

    private ngUnsubscribe = new Subject<void>();
    public loginMode: Boolean = true;
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
        this.authenticationService.login(this.loginForm.value.userName, this.loginForm.value.password).pipe(
            takeUntil(this.ngUnsubscribe)).subscribe(
                _ => {
                    this.correctCredentials = true;
                    this.router.navigate([this.returnUrl]);
                },
                _ => {
                }
            )
    }
    public goToRegister() {
        this.router.navigate(['/register']);
    }
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
