import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {UserModel} from '../../../models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public currentUser: UserModel;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    public as: AuthenticationService, 
    private router: Router,
    ) { }

  public ngOnInit() {
    this.as.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => this.currentUser = x);
  }
  public onLogOut(){
    this.as.logout();
    this.router.navigate(['./login']);
  }
  public ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
