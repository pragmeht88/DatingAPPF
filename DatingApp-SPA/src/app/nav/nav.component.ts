import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authSerrvice: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authSerrvice.login(this.model).subscribe(next => {
      this.alertify.success('logged in successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  loggedIn() {
    return this.authSerrvice.loggedin();
  }

  loggedOut() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    console.log('logged out');
  }

}
