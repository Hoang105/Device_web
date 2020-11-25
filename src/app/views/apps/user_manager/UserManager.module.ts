import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PagingModule } from '../../../Share/paging/Paging.component';
import { UserManagerComponent } from './UserManager.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AddUserManagerComponent } from './AddUserManager/AddUserManager.component';

const routes:Routes=[
    {
        path:'',
        component:UserManagerComponent
    },
    {
        path:'add',
        component:AddUserManagerComponent
    },
    {
        path:'edit/:id',
        component:AddUserManagerComponent
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
    ],
    declarations:[
        UserManagerComponent,
        AddUserManagerComponent
    ],
    exports:[]
})
export class UserManagerModule{

}