import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserEntity } from '../Models/User.Entity';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UserEntity[]>(`http://192.168.0.104:4201/users`);
    }
    getById(id: number) {
        return this.http.get<UserEntity>(`http://192.168.0.104:4201/users/${id}`);
    }
}