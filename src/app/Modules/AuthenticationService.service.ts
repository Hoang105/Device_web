import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn:'root'
})
export class AuthenticationService{
    localhost:'/api/user_manager';
    constructor(
        private http:HttpClient,
    ){

    }
    GetUserManager(){
        return this.http.get(environment.api+this.localhost).pipe(map(r=> {return r;}))
    }
}