import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authSerrvice: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authSerrvice.currentPhotoUrl.subscribe(photoUrl =>
      this.photoUrl = photoUrl);
  }

  login() {
    this.authSerrvice.login(this.model).subscribe(next => {
      this.alertify.success('logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authSerrvice.loggedin();
  }

  loggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authSerrvice.decodedToken = null;
    this.authSerrvice.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
