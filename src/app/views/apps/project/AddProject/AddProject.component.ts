import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectEntity } from '../../../../Models/Project/Project.Entity';
import { ProjectService } from '../../../../Modules/Project.service';

@Component({
    selector:'app-add-Project',
    styleUrls:['./AddProject.component.scss'],
    templateUrl:"./AddProject.component.html"
})
export class AddProjectComponent implements OnInit{
    id:number = +this.route.snapshot.paramMap.get('id');
    project:ProjectEntity=new ProjectEntity();
    constructor(
        private route: ActivatedRoute,
        private _projectservice:ProjectService,
        private router:Router,
    ){

    }
    ngOnInit(){
        if(this.id!=0){
            this._projectservice.GetById(this.id).subscribe(
                (data:any)=>{
                    this.project=data.data;
                }
            )
        }
    }
    Close(){
        setTimeout(() => {
            document.getElementById('notication').style.display='none';
        }, 300);
    }
    submit(){
        if(this.id!=0){
            this._projectservice.EditById(this.project).subscribe(
                (data:any)=>{
                    setTimeout(() => {
                        document.getElementById('notication').style.display='flex';
                    }, 300);
                }
            )
        }
        else{
            this._projectservice.PostProject(this.project).subscribe(
                (data:any)=>{
                    setTimeout(() => {
                        document.getElementById('notication').style.display='flex';
                    }, 300);
                }
            )
        }
    }

    return(){
        this.router.navigate(['/admin/projects']);
    }
}