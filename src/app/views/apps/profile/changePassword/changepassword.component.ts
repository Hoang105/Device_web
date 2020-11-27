import { Component, OnInit } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserManagerEntity } from '../../../../Models/User_manager/UserManager.Entity';
import { UserManagerService } from '../../../../Modules/UserManager.service';

@Component({
    selector:'app-password',
    templateUrl:'./changepassword.component.html',
    styleUrls:['./changepassword.component.scss']
})
export class PasswordComponent implements OnInit{
    data:UserManagerEntity;
    password:string;
    repassword:string;
    constructor(
        public modalRef: BsModalRef,
        private _usermanagerservice:UserManagerService
    ) { }
    ngOnInit() {

    }
    submit(){
        if(this.Compare()==true){
            this.data.user_manager_password=this.password;
            this._usermanagerservice.EditById(this.data).subscribe(
                (data:any)=>{
                    this.modalRef.hide();
                }
            )
        }
        else{
            alert('false')
        }
    }
    Compare(){
        if(this.password===this.repassword){
            return true;
        }
        else{
            return false;
        }
    }
}