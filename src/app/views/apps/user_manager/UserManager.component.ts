import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonComponent } from '../../../app.component';
import { RoleEntity } from '../../../Models/Role/Role.Entity';
import { UserManagerEntity } from '../../../Models/User_manager/UserManager.Entity';
import { UserManagerService } from '../../../Modules/UserManager.service';

@Component({
    selector:'app-user-manager',
    styleUrls:['./UserManager.component.scss'],
    templateUrl:'./UserManager.component.html'
})
export class UserManagerComponent extends CommonComponent<UserManagerEntity> implements OnInit{
    users:UserManagerEntity[];
    admin:UserManagerEntity = new UserManagerEntity();
    role:RoleEntity[];
    date=new Date();
    constructor(
        private _usermanagerservice:UserManagerService,
        private router:Router,
    ){  
        super(_usermanagerservice)
    }
    getRole(){
        this._usermanagerservice.getRole().subscribe(
            (data:any)=>{
                this.role=data.data;
            }
        )
    }
    ngOnChanges(changes){
        this._usermanagerservice.GetUserManager().subscribe(
            (data:any)=>{
                this.users=data.data;
                this.count=this.users.length;
            }
        )
    }
    getUser(){
        this._usermanagerservice.GetUserManager().subscribe(
            (data:any)=>{
                this.users=data.data;
                this.count=this.users.length;
            }
        )
    }
    deletebyId(data){
        this._usermanagerservice.DeleteById(data).subscribe(
            (data:any)=>{
                this.ngOnChanges(data);
                setTimeout(() => {
                    document.getElementById('notication').style.display='flex';
                }, 300);
            }
        )
    }
    Close(){
        setTimeout(() => {
            document.getElementById('notication').style.display='none';
        }, 300);
    }
    add(){
        this.router.navigate(['/admin/usermanager/add']);
    }
    edit(data:UserManagerEntity){
        this.router.navigate([`/admin/usermanager/edit/${data.user_manager_id}`]);
    }
    ngOnInit(){
        this.Paging.Size=10;
        this.getUser();
        this.getRole();
        this.admin=JSON.parse(sessionStorage.getItem('currentUser'));
    }
    get isAdmin() {
        return this.admin && this.admin.user_manager_role === 1;
    }
    get isUser1() {
        return this.admin && this.admin.user_manager_role === 2;
    }
}