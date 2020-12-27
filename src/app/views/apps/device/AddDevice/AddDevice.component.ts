import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceEntity } from '../../../../Models/Device/Device.Entity';
import { HistoryEntity } from '../../../../Models/History/History.Entity';
import { ProjectEntity } from '../../../../Models/Project/Project.Entity';
import { StatusEntity } from '../../../../Models/Status/Status.Entity';
import { UserManagerEntity } from '../../../../Models/User_manager/UserManager.Entity';
import { DeviceService } from '../../../../Modules/Device.service';
import { ProjectService } from '../../../../Modules/Project.service';
import { UserManagerService } from '../../../../Modules/UserManager.service';

@Component({
    selector: 'app-AddDevice',
    styleUrls: ['./AddDevice.component.scss'],
    templateUrl: "./AddDevice.component.html"
})
export class AddDeviceComponent implements OnInit {
    id: number = +this.route.snapshot.paramMap.get('id');
    device: DeviceEntity = new DeviceEntity();
    users: UserManagerEntity[];
    user_device_name: UserManagerEntity = new UserManagerEntity();
    project_device_name: ProjectEntity = new ProjectEntity();
    device_status: StatusEntity = new StatusEntity();
    status: StatusEntity[];
    projects: ProjectEntity[];
    date = new Date();
    history: HistoryEntity = new HistoryEntity();
    admin:UserManagerEntity=new UserManagerEntity();
    constructor(
        private route: ActivatedRoute,
        private _deviceservice: DeviceService,
        private router: Router,
        private _usermanagerservice: UserManagerService,
        private _projectservice: ProjectService,
    ) {

    }
    ngOnInit() {
        this._usermanagerservice.GetUserManager().subscribe(
            (data: any) => {
                this.users = data.data;
            }
        )
        this._projectservice.GetProject().subscribe(
            (data: any) => {
                this.projects = data.data
            }
        )
        this._deviceservice.GetStatus().subscribe(
            (data: any) => {
                this.status = data.data
            }
        )
        if (this.id != 0) {
            this._deviceservice.GetById(this.id).subscribe(
                (data: any) => {
                    this.device = data.data;
                    this._usermanagerservice.GetById(this.device.user_manager_id).subscribe(
                        (data: any) => {
                            this.user_device_name = data.data;
                        }
                    )
                    this._projectservice.GetById(this.device.device_project_id).subscribe(
                        (data: any) => {
                            this.project_device_name = data.data;
                        }
                    )
                    this._deviceservice.GetByIdStatus(this.device.status).subscribe(
                        (data: any) => {
                            this.device_status = data.data;
                        }
                    )
                }
            )
        }
        this.admin=JSON.parse(sessionStorage.getItem('currentUser'));
    }
    Close() {
        setTimeout(() => {
            document.getElementById('notication').style.display = 'none';
        }, 300);
    }
    submit() {
        if (this.id != 0) {
            this._deviceservice.EditById(this.device).subscribe(
                (data: any) => {
                    setTimeout(() => {
                        document.getElementById('notication').style.display = 'flex';
                    }, 300);
                    this.history.device_history_change=new Date();
                    this.history.user_change_id=this.admin.user_manager_id;
                    this.history.device_change_id=this.device.device_id;
                    this._deviceservice.PostHistorty(this.history).subscribe(
                        data=>{
                            console.log(data)
                        }
                    )
                }
            )
        }
        else {
            this._deviceservice.PostDevice(this.device).subscribe(
                (data: any) => {
                    setTimeout(() => {
                        document.getElementById('notication').style.display = 'flex';
                    }, 300);
                }
            )
        }
    }
    selectStatus(event) {
        this.device.status = +event;
    }
    selectOption(event) {
        this.device.device_project_id = +event;
    }
    selectOptionUser(event) {
        this.device.user_manager_id = +event;
    }
    return() {
        this.router.navigate(['/admin/devices']);
    }
}