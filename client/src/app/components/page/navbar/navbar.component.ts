import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {User} from '../../../models/user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  constructor(public as: AuthenticationService) { }

  ngOnInit() {
    this.as.currentUser.subscribe(x => this.currentUser = x);
  }
  onLogClick(){
  
  }
  onLogOut(){
    this.as.logout();
  }
}
