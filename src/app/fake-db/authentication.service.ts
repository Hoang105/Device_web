import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { UserEntity } from '../Models/User.Entity';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserEntity>;
    public currentUser: Observable<UserEntity>;

    constructor(private http: HttpClient,
        private router:Router) {
        this.currentUserSubject = new BehaviorSubject<UserEntity>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserEntity {
        return this.currentUserSubject.value;
    }

    // Post value to API, save in sessionStorage
    login(username: string, password: string) {
        return this.http.post<any>(`http://localhost:4201/users/authenticate`, { username, password })
            .pipe(map(user => {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
    // Delete data from sessionStorage
    logout() {
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
}