import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  public apiUrl = 'http://localhost/gangaweb/';

  constructor(public http: HttpClient) {

  }

  restLogin(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'users/sessionApp', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  restRegister(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'users/registerApp', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
