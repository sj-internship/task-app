import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject<void>();
    public registerForm: FormGroup;
    private returnUrl: string;
    public correctCredentials: boolean;
    public submitted: boolean;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService) {
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
        this.userService.registerUser({
            name: this.registerForm.value.userName,
            password: this.registerForm.value.password
        }).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
            this.router.navigate([this.returnUrl]);
        })
    }
    public goToLogin() {
        this.router.navigate([this.returnUrl]);
    }
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
