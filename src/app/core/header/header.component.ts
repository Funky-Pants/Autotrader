import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'autotrader-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService) { }

  get isLogged(): boolean {
    return this.userService.isLoggedIn;
  }

  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  ngOnInit(): void {
  }
  
  logoutHandler(): void {
    this.userService.LogOut();
  }

}
