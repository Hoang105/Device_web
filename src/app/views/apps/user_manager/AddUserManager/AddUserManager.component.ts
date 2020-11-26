import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RoleEntity } from '../../../../Models/Role/Role.Entity';
import { UserManagerEntity } from '../../../../Models/User_manager/UserManager.Entity';
import { UserManagerService } from '../../../../Modules/UserManager.service';
import { PasswordComponent } from './changePassword/changepassword.component';

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
        this._usermanagerservice.getRole().subscribe(
            (data:any)=>{
                this.roles=data.data
            }
        )
        if(this.id!=0){
            this.edit=true
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
        this.admin=JSON.parse(sessionStorage.getItem('currentUser'));
    }
    submit(){
        if(this.id!=0){
            this._usermanagerservice.EditById(this.user).subscribe(
                (data:any)=>{
                    setTimeout(() => {
                        document.getElementById('notication').style.display='flex';
                    }, 300);
                }
            )
        }
        else{
            // this.user.user_manager_password='12345';
            this._usermanagerservice.PostUser(this.user).subscribe(
                data=>{
                    setTimeout(() => {
                        document.getElementById('notication').style.display='flex';
                    }, 300);
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
    get isAdmin() {
        return this.admin && this.admin.user_manager_role === 1;
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