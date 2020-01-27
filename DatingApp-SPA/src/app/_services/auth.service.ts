import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  // baseUrl = 'http://localhost:5000/api/auth/';
  // jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      }));
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedin() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
