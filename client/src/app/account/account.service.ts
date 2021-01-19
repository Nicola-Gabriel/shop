import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAddress } from '../shared/Models/address';
import { IUser } from '../shared/Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSource = new ReplaySubject<IUser>(1);
  userSource$ = this.userSource.asObservable();
  constructor(private http: HttpClient, private router: Router) { }
  baseUrl = 'https://localhost:5001/api/';




  loadCurrentUser(token: string) {
    if (token === null) {
      this.userSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe (
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.userSource.next(user);
        }
      })
    );
  }

  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          this.userSource.next(user);
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.userSource.next(user);
        }
      })
    );
  }

  returnEmailAddress(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }

  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  logout() {
    localStorage.removeItem('token');
    this.userSource.next(null);
    this.router.navigateByUrl('/');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }
}
