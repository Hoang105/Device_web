import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../fake-db/authentication.service';
import { UserManagerEntity } from '../../../Models/User_manager/UserManager.Entity';
import { UserManagerService } from '../../../Modules/UserManager.service';

@Component({
    selector:'app-login',
    styleUrls:['./Login.component.scss'],
    templateUrl:'./Login.component.html'
})
export class LoginComponent implements OnInit{
    Login:UserManagerEntity=new UserManagerEntity();
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string='/admin';
    error:boolean=false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private _userservice:UserManagerService,
    ) {
    }
    ngOnInit(){
    }
    CheckLogin(){
        this.submitted = true;

        this.loading = true;
        this._userservice.getLogin(this.Login.user_manager_username, this.Login.user_manager_password)
            .subscribe(
                data => {
                    if(data==true){
                        this.router.navigate([this.returnUrl]);
                        this.error=false;
                    }
                    else{
                        this.error=true;
                    }
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}