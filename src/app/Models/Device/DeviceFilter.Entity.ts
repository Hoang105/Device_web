import { FilterEntity } from '../Filter.Entity';

export class DeviceFilterEntity extends FilterEntity{
    FilterAll:string;
    device_name:string;
    device_model_sn:string;
    device_content:string;
    device_location:string;
    device_status:string;
    device_other:string;
    device_user_report:string;
    device_project_id:number;
    user_manager_id:number;
    status:number;
}