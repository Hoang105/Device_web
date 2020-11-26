import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { CommonComponent } from '../../../app.component';
import { ProjectEntity } from '../../../Models/Project/Project.Entity';
import { UserManagerEntity } from '../../../Models/User_manager/UserManager.Entity';
import { ProjectService } from '../../../Modules/Project.service';

@Component({
    selector:'app-Project',
    styleUrls:['./Project.component.scss'],
    templateUrl:'./Project.component.html'
})
export class ProjectComponent extends CommonComponent<ProjectEntity> implements OnInit{
    projects:ProjectEntity[];
    admin:UserManagerEntity=new UserManagerEntity();
    constructor(
        private _projectservice:ProjectService,
        private router:Router,
    ){  
        super(_projectservice)
    }
    ngOnChanges(changes){
        this._projectservice.GetProject().subscribe(
            (data:any)=>{
                this.projects=data.data;
                this.count=this.projects.length;
            }
        )
    }
    getProject(){
        this._projectservice.GetProject().subscribe(
            (data:any)=>{
                this.projects=data.data;
                this.count=this.projects.length;
            }
        )
    }
    deletebyId(data){
        this._projectservice.DeleteById(data).subscribe(
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
        this.router.navigate(['/admin/projects/add']);
    }
    edit(data:ProjectEntity){
        this.router.navigate([`/admin/projects/edit/${data.project_id}`]);
    }
    ngOnInit(){
        this.Paging.Size=10;
        this.getProject();
        this.admin=JSON.parse(sessionStorage.getItem('currentUser'));
    }
    get isAdmin() {
        return this.admin && this.admin.user_manager_role === 1;
    }
    get isUser1() {
        return this.admin && this.admin.user_manager_role === 2;
    }
}