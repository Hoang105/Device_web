import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PagingModule } from '../../../Share/paging/Paging.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PasswordComponent } from './changePassword/changepassword.component';
import { ProfileComponent } from './profile.component';

const routes:Routes=[
    {
        path:'',
        component:ProfileComponent
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
        ProfileComponent,
        PasswordComponent
    ],
    entryComponents: [ PasswordComponent ],
    exports:[]
})
export class ProfileModule{

}