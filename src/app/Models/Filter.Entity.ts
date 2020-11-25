import { HttpParams } from '@angular/common/http';

export class FilterEntity {
  ALL_FIELD:string;
  PAGEINDEX:number=1;
  PAGESIZE:number=10;
  ToParams(): HttpParams {
    let params = new HttpParams();
    for (let key in this) {
      if (this.hasOwnProperty(key) && this[key.toString()] != null) {
        params = params.set(key, this[key.toString()]);
      }
    }
    return params;
  }
}
