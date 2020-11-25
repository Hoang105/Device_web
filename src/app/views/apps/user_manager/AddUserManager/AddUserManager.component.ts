import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoleEntity } from '../../../../Models/Role/Role.Entity';
import { UserManagerEntity } from '../../../../Models/User_manager/UserManager.Entity';
import { UserManagerService } from '../../../../Modules/UserManager.service';

@Component({
    selector:'app-add-UserManager',
    styleUrls:['./AddUserManager.component.scss'],
    templateUrl:"./AddUserManager.component.html"
})
export class AddUserManagerComponent implements OnInit{
    id:number = +this.route.snapshot.paramMap.get('id');
    user:UserManagerEntity=new UserManagerEntity();
    user_role:RoleEntity=new RoleEntity()
    roles:RoleEntity[];
    constructor(
        private route: ActivatedRoute,
        private _usermanagerservice:UserManagerService,
        private router:Router,
    ){

    }
    ngOnInit(){
        this._usermanagerservice.getRole().subscribe(
            (data:any)=>{
                this.roles=data.data
            }
        )
        if(this.id!=0){
            this._usermanagerservice.GetById(this.id).subscribe(
                (data:any)=>{
                    this.user=data.data;
                    this._usermanagerservice.getRoleById(this.user.user_manager_role).subscribe(
                       (data:any)=>{
                            this.user_role=data.data;
                        }
                    )
                }
            )
        }
    }
    submit(){
        if(this.id!=0){
            this._usermanagerservice.EditById(this.user).subscribe(
                (data:any)=>{
                    console.log(data);
                    setTimeout(() => {
                        document.getElementById('notication').style.display='flex';
                    }, 300);
                }
            )
        }
        else{
            this.user.user_manager_password='Abc@123';
            this._usermanagerservice.PostUser(this.user).subscribe(
                data=>{
                    console.log(data);
                }
            )
        }
    }
    Close(){
        setTimeout(() => {
            document.getElementById('notication').style.display='none';
        }, 300);
    }
    selectOption(event)
    {
        this.user.user_manager_role = +event;
    }
    return(){
        this.router.navigate(['/admin/usermanager']);
    }
}