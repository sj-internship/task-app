import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {User} from '../../../models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public currentUser: User;
  private ngUnsubscribe = new Subject<void>();

  constructor(public as: AuthenticationService) { }

  ngOnInit() {
    this.as.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => this.currentUser = x);
  }
  public onLogClick(){
  
  }
  public onLogOut(){
    this.as.logout();
  }
}
