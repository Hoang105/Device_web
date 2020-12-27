import { IEntity } from '../IEntity.Entity';

export class HistoryEntity extends IEntity{
    device_history_id:number;
    device_history_status:string;
    device_history_change:Date;
    user_change_id:number;
    device_change_id:number;
}