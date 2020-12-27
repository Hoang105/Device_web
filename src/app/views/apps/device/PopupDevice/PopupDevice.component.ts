import { Component, OnInit } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DeviceEntity } from "../../../../Models/Device/Device.Entity";
import { FilterEntity } from "../../../../Models/Filter.Entity";
import { HistoryFilterEntity } from "../../../../Models/History/FIlterHistory.Entity";
import { HistoryEntity } from "../../../../Models/History/History.Entity";
import { ProjectEntity } from "../../../../Models/Project/Project.Entity";
import { UserManagerEntity } from "../../../../Models/User_manager/UserManager.Entity";
import { DeviceService } from "../../../../Modules/Device.service";
import { ProjectService } from "../../../../Modules/Project.service";
import { UserManagerService } from "../../../../Modules/UserManager.service";
import { paging } from "../../../../Share/paging/Paging";

@Component({
    selector: 'app-PopupDevice',
    templateUrl: './PopupDevice.component.html',
    styleUrls: ['./PopupDevice.component.scss']
})
export class PopupDeviceComponent implements OnInit {
    data: any;
    filter: FilterEntity;
    projects: ProjectEntity[];
    project: ProjectEntity = new ProjectEntity();
    loghistory: HistoryFilterEntity = new HistoryFilterEntity();
    loghistories: HistoryEntity[];
    empList: Array<{ id: number, name: string }> = [];
    date = new Date();
    showdetail: boolean = false;
    showhistory: boolean = false;
    users:UserManagerEntity[];
    constructor(
        public modalRef: BsModalRef,
        private _deviceservice: DeviceService,
        private _projectservice: ProjectService,
        private _usermanagerservice: UserManagerService,

    ) { }
    ngOnInit() {
        this._projectservice.GetProject().subscribe(
            (data: any) => {
                this.projects = data.data;
                this.project = this.projects.find(x => x.project_id = this.data.device_project_id)
                this.data.device_project_name = this.project.project_name;
            }
        )
        this.gethistory();
        this.getUser();
    }
    getUser(){
        this._usermanagerservice.GetUserManager().subscribe(
            (data:any)=>{
                this.users=data.data;
            }
        )
    }
    gethistory() {
        this.loghistory.device_change_id = this.data.device_id;
        this._deviceservice.GetFilterHistorty(this.loghistory).subscribe(
            (data: any) => {
                this.loghistories = data.data;
            })
    }
    submit() {

    }
    ShowdetailProject() {
        this.showdetail = true;
    }
    HidendetailProject() {
        this.showdetail = false;
    }
    Showhistory() {
        this.showhistory = true;
    }
    Hidenhistory() {
        this.showhistory = false;
    }
}