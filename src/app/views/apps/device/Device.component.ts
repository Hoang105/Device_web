import { formatDate } from '@angular/common';
import { Component, OnChanges, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonComponent } from '../../../app.component';
import { DeviceEntity } from '../../../Models/Device/Device.Entity';
import { DeviceFilterEntity } from '../../../Models/Device/DeviceFilter.Entity';
import { ProjectEntity } from '../../../Models/Project/Project.Entity';
import { StatusEntity } from '../../../Models/Status/Status.Entity';
import { UserManagerEntity } from '../../../Models/User_manager/UserManager.Entity';
import { DeviceService } from '../../../Modules/Device.service';
import { ExportService } from '../../../Modules/Export.service';
import { ProjectService } from '../../../Modules/Project.service';
import { UserManagerService } from '../../../Modules/UserManager.service';
import { NotificationWarningComponent } from './NotificationWarning/NotificationWarning.component';

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
    deviceprint:DeviceEntity[] = [];
    deviceprintwrong:DeviceEntity[] = [];
    deviceprintupdate:DeviceEntity[] = [];
    modalRef: BsModalRef;
    projects:ProjectEntity[];
    users:UserManagerEntity[];
    status:StatusEntity[];
    admin:UserManagerEntity=new UserManagerEntity();
    empList: Array<{id:number, name: string, message: string,status:boolean,error:boolean}> = [];
    filter:DeviceFilterEntity=new DeviceFilterEntity();
    deviceFilter:DeviceEntity[];
    date=new Date();
    showprint:boolean=false;
    notication:boolean=false;
    constructor(
        private _deviceservice:DeviceService,
        private _projectservice:ProjectService,
        private _usermanagerservice:UserManagerService,
        private router:Router,
        private _export:ExportService,
        private modalService: BsModalService
    ){  
        super(_deviceservice)
    }
    ngOnChanges(data){
        this.devices=data;
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
    getStatus(){
        this._deviceservice.GetStatus().subscribe(
            (data:any)=>{
                this.status=data.data;
            }
        )
    }
    DataWarning(data){
        for(var i=0;i<data.length;i++){
            if (data[i].status==1){
                this.empList.push({id:this.devices[i].device_id, name:this.devices[i].device_name,message:"Thiết bị lỗi", status:false,error:true });
            }
        }
    }
    compareDate(data){
        for(var i=0;i<data.length;i++){
            var date1 = new Date().getTime();
            var date2 = new Date(this.devices[i].device_warranty_period).getTime();
            var milliseconds = date2-date1;
            var days = milliseconds/86400000;
            if (7>=days&&days>0){
                this.empList.push({id:this.devices[i].device_id, name:this.devices[i].device_name,message:"bảo hiểm còn dưới 1 tuần", status:true, error:false });
            }
            else if (30>=days&&days>7){
                this.empList.push({id:this.devices[i].device_id, name:this.devices[i].device_name,message:"bảo hiểm còn dưới 1 tháng" , status:false, error:false});
            }
        }
    }
    ChangeProject(e){
        this.filter.device_project_id= +e;
        this.FilterAll(this.filter);
    }
    ChangeUser(u){
        this.filter.user_manager_id= +u;
        this.FilterAll(this.filter);
    }
    ChangeStatus(e){
        this.filter.status= +e;
        this.FilterAll(this.filter);
    }
    ShowInReport(){
        if(this.showprint==false){
            this.showprint=true;
        }
        else{
            this.showprint=false;
        }
    }
    PrintData(){
        for(var i=0;i<this.devices.length;i++){
            var date1 = new Date().getTime();
            var date2 = new Date(this.devices[i].device_warranty_period).getTime();
            var milliseconds = date2-date1;
            var days = milliseconds/86400000;
            if (7>=days&&days>0){
                this.deviceprint.push({  
                    device_id:this.devices[i].device_id,
                    device_name:this.devices[i].device_name,
                    device_model_sn:this.devices[i].device_model_sn,
                    device_content:this.devices[i].device_content,
                    device_location:this.devices[i].device_location,
                    device_project_id:this.devices[i].device_project_id,
                    device_status:this.devices[i].device_status,
                    device_produce:this.devices[i].device_produce,
                    device_report:this.devices[i].device_report,
                    device_warranty_period:this.devices[i].device_warranty_period,
                    device_other:this.devices[i].device_other,
                    device_user_report:this.devices[i].device_user_report,
                    user_manager_id:this.devices[i].user_manager_id,
                    status:this.devices[i].status
                });
            }
            else if (30>=days&&days>7){
                this.deviceprint.push({  
                    device_id:this.devices[i].device_id,
                    device_name:this.devices[i].device_name,
                    device_model_sn:this.devices[i].device_model_sn,
                    device_content:this.devices[i].device_content,
                    device_location:this.devices[i].device_location,
                    device_project_id:this.devices[i].device_project_id,
                    device_status:this.devices[i].device_status,
                    device_produce:this.devices[i].device_produce,
                    device_report:this.devices[i].device_report,
                    device_warranty_period:this.devices[i].device_warranty_period,
                    device_other:this.devices[i].device_other,
                    device_user_report:this.devices[i].device_user_report,
                    user_manager_id:this.devices[i].user_manager_id,
                    status:this.devices[i].status
                });
            }
        }
        this._export.exportAsExcelFile(this.deviceprint, 'Báo cáo hết bảo hành')
    }
    PrintDataWrong(){
        for(var i=0;i<this.devices.length;i++){
            var date1 = new Date().getTime();
            var date2 = new Date(this.devices[i].device_report).getTime();
            var milliseconds = date1-date2;
            var days = milliseconds/86400000;
            if (30>=days&&days>0&&this.devices[i].status==1){
                this.deviceprintwrong.push({  
                    device_id:this.devices[i].device_id,
                    device_name:this.devices[i].device_name,
                    device_model_sn:this.devices[i].device_model_sn,
                    device_content:this.devices[i].device_content,
                    device_location:this.devices[i].device_location,
                    device_project_id:this.devices[i].device_project_id,
                    device_status:this.devices[i].device_status,
                    device_produce:this.devices[i].device_produce,
                    device_report:this.devices[i].device_report,
                    device_warranty_period:this.devices[i].device_warranty_period,
                    device_other:this.devices[i].device_other,
                    device_user_report:this.devices[i].device_user_report,
                    user_manager_id:this.devices[i].user_manager_id,
                    status:this.devices[i].status
                });
            }
        }
        this._export.exportAsExcelFile(this.deviceprintwrong, 'Báo cáo thiết bị lỗi')
    }
    PrintDataUpdate(){
        for(var i=0;i<this.devices.length;i++){
            if (this.devices[i].status==2){
                this.deviceprintupdate.push({ 
                    device_id:this.devices[i].device_id,
                    device_name:this.devices[i].device_name,
                    device_model_sn:this.devices[i].device_model_sn,
                    device_content:this.devices[i].device_content,
                    device_location:this.devices[i].device_location,
                    device_project_id:this.devices[i].device_project_id,
                    device_status:this.devices[i].device_status,
                    device_produce:this.devices[i].device_produce,
                    device_report:this.devices[i].device_report,
                    device_warranty_period:this.devices[i].device_warranty_period,
                    device_other:this.devices[i].device_other,
                    device_user_report:this.devices[i].device_user_report,
                    user_manager_id:this.devices[i].user_manager_id,
                    status:this.devices[i].status
                });
            }
        }
        this._export.exportAsExcelFile(this.deviceprintupdate, 'Báo cáo đang sửa chữa')
    }
    getProject(){
        this._projectservice.GetProject().subscribe(
            (data:any)=>{
                this.projects=data.data;
            }
        )
    }
    TurnOffNoti(){
        this.notication=false;
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
    GetdetailNoti(event){
        this.modalRef = this.modalService.show(NotificationWarningComponent,  {
            initialState: {
            title: 'Modal title',
            data: event
        }});
    }
    add(){
        this.router.navigate(['/admin/devices/add']);
    }
    edit(data:DeviceEntity){
        this.router.navigate([`/admin/devices/edit/${data.device_id}`]);
    }
    ngOnInit(){
        this.getStatus();
        this.getUser();
        this.getProject();
        this.Paging.Size=10;
        this.filter.device_project_id=0;
        this.filter.user_manager_id=0;
        this.filter.status=0;
        this._deviceservice.GetDevice().subscribe(
            (data:any)=>{
                this.devices=data.data;
                this.count=this.devices.length;
                this.compareDate(this.devices);
                this.DataWarning(this.devices)
            }
        )
        this.notication=true;
        this.admin=JSON.parse(sessionStorage.getItem('currentUser'));
    }
    get isAdmin() {
        return this.admin && this.admin.user_manager_role === 1;
    }
    get isUser1() {
        return this.admin && this.admin.user_manager_role === 2;
    }
}