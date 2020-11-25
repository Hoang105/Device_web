import { RoleEntity } from '../Role/Role.Entity';

export class UserManagerEntity extends RoleEntity{
    user_manager_id:number;
    user_manager_name:string;
    user_manager_birthday:string;
    user_manager_email:string;
    user_manager_phone:string;
    user_manager_username:string;
    user_manager_password:string;
    user_manager_role:number;
    token?: string;
}