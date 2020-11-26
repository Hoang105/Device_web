import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DeviceEntity } from '../Models/Device/Device.Entity';
import { DeviceFilterEntity } from '../Models/Device/DeviceFilter.Entity';
import { ProjectEntity } from '../Models/Project/Project.Entity';
import { LoaderService } from '../Share/Loader/Loader.service';
import { HttpService } from './HttpService.service';

@Injectable({
    providedIn:'root'
})
export class DeviceService extends HttpService<DeviceEntity>{
    localhost:string='/api/devices';

    constructor(
        private http: HttpClient,
        public loaderService: LoaderService
    ){
        super(http,loaderService)
    }
    GetDevice(){
        return this.http.get(environment.api+this.localhost)
        .pipe(map(r=> {return r;}))
    }
    DeleteById(Entity:DeviceEntity){
        return this.http.delete(environment.api+this.localhost+ `/${Entity.device_id}`)
        .pipe(map(r=> {return r;}))
    }
    EditById(Entity:DeviceEntity){
        return this.http.put(environment.api+this.localhost+ `/${Entity.device_id}`,Entity)
        .pipe(map(r=> {return r;}))
    }
    PostDevice(Entity:DeviceEntity){
        return this.http.post(environment.api+this.localhost,Entity)
        .pipe(map(r=> {return r;}))
    }
    GetById(id:number){
        return this.http.get(environment.api+this.localhost+ `/${id}`)
        .pipe(map(r=> {return r;}))
    }
    Getfilter(filter:DeviceFilterEntity){
        return this.http.post(environment.api+this.localhost+'/getfilter',filter)
        .pipe(map(r=> {
            console.log(r)
            return r;}))
    }
}