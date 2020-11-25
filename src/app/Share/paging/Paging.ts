import { OnChanges } from '@angular/core';

export class paging implements OnChanges {
    id: number;
    isActived: boolean = false;
    show: boolean = true;
    Size: number = 10;
    TotalData: number = 0;
    TotalPages: number = 0;
    Index: number = 1;
    Pages: paging[] = [];
    VisiblePage: number = 5;
    constructor() {
    }

    ngOnChanges() {

    }

}