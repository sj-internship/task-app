import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {UserModel} from '../../../models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public currentUser: UserModel;
  private ngUnsubscribe = new Subject<void>();

  constructor(public as: AuthenticationService) { }

  public ngOnInit() {
    this.as.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => this.currentUser = x);
  }
  public onLogClick(){
  
  }
  public onLogOut(){
    this.as.logout();
  }
  public ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
