// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const AppRoutes:Routes=[
    {
        path: '',
        redirectTo: 'usermanager',
        pathMatch: 'full',
    },
    {
        path:'usermanager',
        loadChildren: () => import('./user_manager/UserManager.module').then(m => m.UserManagerModule)
    },
    {
      path:'projects',
      loadChildren: () => import('./project/Project.module').then(m => m.ProjectModule)
    },
    {
      path:'devices',
      loadChildren: () => import('./device/Device.module').then(m => m.DevicetModule)
    }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(AppRoutes)
  ],
  declarations: [
  ]
})
export class AppsModule { }
