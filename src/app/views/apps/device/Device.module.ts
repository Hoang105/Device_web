import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PagingModule } from '../../../Share/paging/Paging.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { DeviceComponent } from './Device.component';
import { AddDeviceComponent } from './AddDevice/AddDevice.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotificationWarningComponent } from './NotificationWarning/NotificationWarning.component';

const routes:Routes=[
    {
        path:'',
        component:DeviceComponent
    },
    {
        path:'add',
        component:AddDeviceComponent
    },
    {
        path:'edit/:id',
        component:AddDeviceComponent
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
        DeviceComponent,
        AddDeviceComponent,
        NotificationWarningComponent
    ],
    entryComponents: [ NotificationWarningComponent ],
    exports:[]
})
export class DevicetModule{

}