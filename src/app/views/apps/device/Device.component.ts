import { formatDate } from '@angular/common';
import { Component, OnChanges, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonComponent } from '../../../app.component';
import { DeviceEntity } from '../../../Models/Device/Device.Entity';
import { DeviceFilterEntity } from '../../../Models/Device/DeviceFilter.Entity';
import { ProjectEntity } from '../../../Models/Project/Project.Entity';
import { RoleEntity } from '../../../Models/Role/Role.Entity';
import { UserManagerEntity } from '../../../Models/User_manager/UserManager.Entity';
import { DeviceService } from '../../../Modules/Device.service';
import { ProjectService } from '../../../Modules/Project.service';
import { UserManagerService } from '../../../Modules/UserManager.service';

export class Notication {
    name:string;
    message:string;
}

@Component({
    selector:'app-Device',
    styleUrls:['./Device.component.scss'],
    templateUrl:'./Device.component.html'
})
export class DeviceComponent extends CommonComponent<DeviceEntity> implements OnInit,OnChanges{
    devices:DeviceEntity[];
    projects:ProjectEntity[];
    users:UserManagerEntity[];
    admin:UserManagerEntity=new UserManagerEntity();
    empList: Array<{name: string, message: string,status:boolean}> = [];
    filter:DeviceFilterEntity=new DeviceFilterEntity();
    deviceFilter:DeviceEntity[];
    date=new Date();
    constructor(
        private _deviceservice:DeviceService,
        private _projectservice:ProjectService,
        private _usermanagerservice:UserManagerService,
        private router:Router,
    ){  
        super(_deviceservice)
    }
    ngOnChanges(data){
        if(data.success=true){
            this._deviceservice.GetDevice().subscribe(
                (data:any)=>{
                    this.devices=data.data;
                    this.count=this.devices.length;
                }
            )
        }
        else{
            this.devices=data;
        }
    }
    Close(){
        setTimeout(() => {
            document.getElementById('notication').style.display='none';
        }, 300);
    }
    getDevice(){
        this._deviceservice.GetDevice().subscribe(
            (data:any)=>{
                this.devices=data.data;
                this.count=this.devices.length;
            }
        )
    }
    compareDate(data){
        for(var i=0;i<data.length;i++){
            var date1 = new Date().getTime();
            var date2 = new Date(this.devices[i].device_warranty_period).getTime();
            var milliseconds = date2-date1;
            var days = milliseconds/86400000;
            if (7>=days&&days>0){
                this.empList.push({name:this.devices[i].device_name,message:"bảo hiểm còn dưới 1 tuần", status:true });
            }
            else if (30>=days&&days>7){
                this.empList.push({name:this.devices[i].device_name,message:"bảo hiểm còn dưới 1 tháng" , status:false});
            }
        }
    }
    getProject(){
        this._projectservice.GetProject().subscribe(
            (data:any)=>{
                this.projects=data.data;
            }
        )
    }
    TurnOffNoti(){
        document.getElementById("form-warning").style.display = "none";
    }
    getUser(){
        this._usermanagerservice.GetUserManager().subscribe(
            (data:any)=>{
                this.users=data.data;
            }
        )
    }
    FilterAll(filter:DeviceFilterEntity){
        this._deviceservice.Getfilter(filter).subscribe(
            (data:any)=>{
                this.ngOnChanges(data.data);
            }
        )
    }
    deletebyId(data){
        this._deviceservice.DeleteById(data).subscribe(
            (data:any)=>{
                this.ngOnChanges(data);
                setTimeout(() => {
                    document.getElementById('notication').style.display='flex';
                }, 300);
            }
        )
    }
    add(){
        this.router.navigate(['/admin/devices/add']);
    }
    edit(data:DeviceEntity){
        this.router.navigate([`/admin/devices/edit/${data.device_id}`]);
    }
    ngOnInit(){
        this.getUser();
        this.getProject();
        this.Paging.Size=10;
        this._deviceservice.GetDevice().subscribe(
            (data:any)=>{
                this.devices=data.data;
                this.count=this.devices.length;
                this.compareDate(this.devices);
            }
        )
        this.admin=JSON.parse(sessionStorage.getItem('currentUser'));
    }
    get isAdmin() {
        return this.admin && this.admin.user_manager_role === 1;
    }
    get isUser1() {
        return this.admin && this.admin.user_manager_role === 2;
    }
    
}