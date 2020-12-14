import { Component, OnInit } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DeviceEntity } from "../../../../Models/Device/Device.Entity";
import { FilterEntity } from "../../../../Models/Filter.Entity";
import { ProjectEntity } from '../../../../Models/Project/Project.Entity';
import { DeviceService } from "../../../../Modules/Device.service";
import { ProjectService } from '../../../../Modules/Project.service';

@Component({
    selector:'app-popupInforProject',
    templateUrl:'./popupInforProject.component.html',
    styleUrls:['./popupInforProject.component.scss']
})
export class PopupInforProjectComponent implements OnInit{
    data:any;
    filter:FilterEntity;
    devices:DeviceEntity[];
    empList: Array<{id:number, name: string}> = [];
    constructor(
        public modalRef: BsModalRef,
        private _projectservice:ProjectService,
        private _deviceservice:DeviceService,

    ) { }
    ngOnInit() {
        this._deviceservice.GetDevice().subscribe(
            (x:any)=>{
                this.devices=x.data;
                for(var i=0;i<this.devices.length;i++){
                    if (this.devices[i].device_project_id==this.data.project_id){
                        this.empList.push({id:this.devices[i].device_id, name:this.devices[i].device_name});
                    }
                }
            }
        )
    }
    submit(){

    }
}