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
    error = '';
    returnUrl: string='/admin';
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private _userservice:UserManagerService,
    ) {
    }
    ngOnInit(){
        this.Login.user_manager_username='23123';
        this.Login.user_manager_password='Abc@123';
    }


    CheckLogin(){
        this.submitted = true;

        this.loading = true;
        // this.authenticationService.login(this.Login.user_manager_username, this.Login.user_manager_password)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.error = error;
        //             this.loading = false;
        //         });
        this._userservice.getLogin(this.Login.user_manager_username, this.Login.user_manager_password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
    
}