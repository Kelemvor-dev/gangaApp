import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  apiUrl: any = 'http://192.168.56.1/gangaweb/';

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

  restResetpass(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'users/users/resetPassapp', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  restcontact(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'users/users/resetPassapp', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  countNotifications(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'home/countNotifications', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  bannerHome() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'home/bannerhomeApp').subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getPublicacions() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'home/getPublications').subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getlistNumnotifications(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'home/getlistNumnotifications', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getCategories(id) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'home/getCategoriesApp', id, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
  getProductsbycategorie(id){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'home/getProductsbycategorie', id, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getProductsimages(){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'home/getProductsimages').subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

}
