import { Component, OnInit } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProjectEntity } from '../../../../Models/Project/Project.Entity';
import { DeviceService } from '../../../../Modules/Device.service';
import { ProjectService } from '../../../../Modules/Project.service';

@Component({
    selector:'app-NotificationWarning',
    templateUrl:'./NotificationWarning.component.html',
    styleUrls:['./NotificationWarning.component.scss']
})
export class NotificationWarningComponent implements OnInit{
    data:any;
    datashow:any;
    constructor(
        public modalRef: BsModalRef,
        private _deviceservice:DeviceService
    ) { }
    ngOnInit() {
        this._deviceservice.GetById(this.data.id).subscribe(
            (x:any)=>{
                this.datashow=x.data;
                console.log(this.datashow)
            }
        )
        console.log(this.data)
    }
    submit(){

    }
}