import { IEntity } from '../IEntity.Entity';

export class DeviceEntity extends IEntity{
    device_id:number;
    device_name:string;
    device_model_sn:string;
    device_content:string;
    device_location:string;
    device_project_id:number;
    device_status:string;
    device_produce:number;
    device_report:Date;
    device_warranty_period:Date;
    device_other:string;
    device_user_report:string;
    user_manager_id:number;
    status:number;
}