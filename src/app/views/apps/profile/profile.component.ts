import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RoleEntity } from '../../../Models/Role/Role.Entity';
import { UserManagerEntity } from '../../../Models/User_manager/UserManager.Entity';
import { UserManagerService } from '../../../Modules/UserManager.service';
import { PasswordComponent } from './changePassword/changepassword.component';

@Component({
    selector:'app-profile',
    styleUrls:['./profile.component.scss'],
    templateUrl:"./profile.component.html"
})
export class ProfileComponent implements OnInit{
    id:number = +this.route.snapshot.paramMap.get('id');
    user:UserManagerEntity=new UserManagerEntity();
    user_role:RoleEntity=new RoleEntity()
    roles:RoleEntity[];
    admin:UserManagerEntity=new UserManagerEntity();
    modalRef: BsModalRef;
    edit:boolean=false;
    constructor(
        private route: ActivatedRoute,
        private _usermanagerservice:UserManagerService,
        private router:Router,
        private modalService: BsModalService
    ){

    }
    ngOnInit(){
        this.user=JSON.parse(sessionStorage.getItem('currentUser'));
        this._usermanagerservice.getRoleById(this.user.user_manager_role).subscribe(
            (data:any)=>{
                 this.user_role=data.data;
             }
         )
        this._usermanagerservice.getRole().subscribe(
            (data:any)=>{
                this.roles=data.data
            }
        )
    }
    submit(){
        this._usermanagerservice.EditById(this.user).subscribe(
            (data:any)=>{
                setTimeout(() => {
                    document.getElementById('notication').style.display='flex';
                }, 300);
            }
        )
    }
    get isAdmin() {
        return this.user && this.user.user_manager_role === 1;
    }
    Close(){
        setTimeout(() => {
            document.getElementById('notication').style.display='none';
        }, 300);
    }
    changeUser(user:UserManagerEntity) {
        this.modalRef = this.modalService.show(PasswordComponent,  {
                initialState: {
                title: 'Modal title',
                data: user
            }
        });
    }
}