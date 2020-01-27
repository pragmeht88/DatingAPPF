import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authSerrvice: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authSerrvice.login(this.model).subscribe(next => {
      console.log('logged in successfully');
    }, error => {
      console.log(error);
    });
  }

  loggedIn() {
    return this.authSerrvice.loggedin();
  }

  loggedOut() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
