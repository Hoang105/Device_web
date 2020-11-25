import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FilterEntity } from './Models/Filter.Entity';
import { IEntity } from './Models/IEntity.Entity';
import { HttpService } from './Modules/HttpService.service';
import { paging } from './Share/paging/Paging';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
export class CommonComponent<Entity extends IEntity>{
  count: number = 0;
  Paging: paging = new paging();
  constructor(
      private _httpservice:HttpService<Entity>,
  ){}
  //Get an Entity with Filter
  Get(SearchEntity: FilterEntity, url:string) {
      let promise = new Promise((resolve, reject) => {
        this._httpservice.Gets(SearchEntity,url).subscribe(res => {
            resolve(res);
        })
      })
      return promise;
  }
  //Post an Entity
  Post(PostEntity: Entity,url:string) {
      let promise = new Promise((resolve) => {
          this._httpservice.Posts(PostEntity,url).subscribe(res => {
              resolve(res)
          })
        })
      return promise;
  }
  //Delete an Entity
  Delete(id:number,url:string) {
      let promise = new Promise((resolve) => {
          this._httpservice.Delete(id,url).subscribe(res => {
              resolve(res)
          })
        })
      return promise;
  }
  //Filter by FiterEntity
  FilterbyEntity(SearchEntity: FilterEntity, url:string){
      let promise = new Promise((resolve) => {
          this._httpservice.Filter(SearchEntity,url).subscribe(res => {
              resolve(res)
          })
        })
      return promise;
  }
  //Get detail Entity by id
  GetDetailEntityId(id:number,url:string){
      let promise = new Promise((resolve) => {
          this._httpservice.GetDetailId(id,url).subscribe(res => {
              resolve(res)
          })
        })
      return promise;
  }
}