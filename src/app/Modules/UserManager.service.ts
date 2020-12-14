import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserManagerEntity } from '../Models/User_manager/UserManager.Entity';
import { LoaderService } from '../Share/Loader/Loader.service';
import { HttpService } from './HttpService.service';

@Injectable({
    providedIn:'root'
})
export class UserManagerService extends HttpService<UserManagerEntity>{
    localhost:string='/api/user_manager';
    localhost_role:string='/api/role_manager';
    private currentUserSubject: BehaviorSubject<UserManagerEntity>;
    public currentUser: Observable<UserManagerEntity>;
    constructor(
        private http: HttpClient,
        public loaderService: LoaderService,
        private router:Router
    ){
        super(http,loaderService);
        this.currentUserSubject = new BehaviorSubject<UserManagerEntity>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): UserManagerEntity {
        return this.currentUserSubject.value;
    }
    getLogin(username:string,password:string){
        return this.http.get(environment.api+this.localhost).pipe(map((r:any)=> {
            for(let i=0;i<r.data.length;i++){
                if(username==r.data[i].user_manager_username&&password==r.data[i].user_manager_password){
                    sessionStorage.setItem('currentUser', JSON.stringify(r.data[i]));
                    this.currentUserSubject.next(r.data[i]);
                    return true;
                }
            }
        }))
    }
    logout() {
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
    GetUserManager(){
        return this.http.get(environment.api+this.localhost)
        .pipe(map(r=> {return r;}))
    }
    DeleteById(Entity:UserManagerEntity){
        return this.http.delete(environment.api+this.localhost+ `/${Entity.user_manager_id}`)
        .pipe(map(r=> {return r;}))
    }
    EditById(Entity:UserManagerEntity){
        return this.http.put(environment.api+this.localhost+ `/${Entity.user_manager_id}`,Entity)
        .pipe(map(r=> {return r;}))
    }
    PostUser(Entity:UserManagerEntity){
        return this.http.post(environment.api+this.localhost,Entity)
        .pipe(map(r=> {return r;}))
    }
    GetById(id:number){
        return this.http.get(environment.api+this.localhost+ `/${id}`)
        .pipe(map(r=> {return r;}))
    }
    getRole(){
        return this.http.get(environment.api+this.localhost_role)
        .pipe(map(r=> {return r;}))
    }
    getRoleById(id:number){
        return this.http.get(environment.api+this.localhost_role+ `/${id}`)
        .pipe(map(r=> {return r;}))
    }
}