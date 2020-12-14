import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PagingModule } from '../../../Share/paging/Paging.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ProjectComponent } from './Project.component';
import { AddProjectComponent } from './AddProject/AddProject.component';
import { PopupInforProjectComponent } from './popupInforProject/popupInforProject.component';
import { ModalModule } from 'ngx-bootstrap/modal';

const routes:Routes=[
    {
        path:'',
        component:ProjectComponent
    },
    {
        path:'add',
        component:AddProjectComponent
    },
    {
        path:'edit/:id',
        component:AddProjectComponent
    },
]

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        PagingModule,
        PopoverModule.forRoot(),
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger' // set defaults here
        }),
        ModalModule.forRoot()
    ],
    declarations:[
        ProjectComponent,
        AddProjectComponent,
        PopupInforProjectComponent
    ],
    entryComponents: [ PopupInforProjectComponent ],
    exports:[]
})
export class ProjectModule{

}