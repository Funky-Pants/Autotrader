import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces';
//import { StorageService } from './storage.service';

export interface CreateUserDto { username: string, email: string, password: string, firstName: string, lastName: string, phoneNumber: number, city: string  }

export interface UpdateUserDto { password: string, firstName: string, lastName: string, phoneNumber: number, city: string  }

@Injectable({ providedIn: 'root' })
export class UserService {

  currentUser!: IUser;

  get isLogged() {
    return !!this.currentUser;
  }

  constructor(/*private storage: StorageService,*/ private httpClient: HttpClient) {
    console.log('UserService#constructor')
  }

  login$(data: { email: string; password: string }): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.firebaseConfig}/login`, data, { withCredentials: true })
    .pipe(tap((user) => this.currentUser = user));
  }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.firebaseConfig}/users/profile`, { withCredentials: true })
      .pipe(tap(user => this.currentUser = user))
  }

  logout(): void {
  }

  register$(userData: CreateUserDto): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.firebaseConfig}/register`, userData, { withCredentials: true })
  }
  updateprofile$(userData: UpdateUserDto): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.firebaseConfig}/updateprofile`, userData, { withCredentials: true })
  }
}

