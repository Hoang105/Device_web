import { Component, Input, EventEmitter, Output, OnChanges, OnInit, NgModule } from '@angular/core';
import { paging } from './Paging';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Paging',
  templateUrl: './Paging.component.html',
  styleUrls: ['./Paging.component.scss']
})
export class pagingComponent implements OnChanges, OnInit{
  @Input() Page: paging;
  @Input() totalData: number;
  @Input() linkRoute: string;
  @Output() onChange: EventEmitter<paging> = new EventEmitter<paging>();
  options = [10,20,50,100];
  constructor(private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    if(this.Page.Size == undefined) 
    this.router.navigate([this.linkRoute], { queryParams: { page: 1, Size: 10 } });
    this.route.queryParams.subscribe(
      params => {
        this.Page.Index = params['page'];
        this.Page.Size = params['Size'];
      }
    )
  }
  ngOnChanges() {
    this.Page.TotalData = this.totalData;
    if(this.Page.Size == undefined) this.Page.Size = 10;
     this.Reload();
  }
  navigate() {
    if (this.Page.Index > 0) {
      this.router.navigate([this.linkRoute], { queryParams: { page: this.Page.Index, Size: this.Page.Size } });
    }
  }
  Reload() {
    if (this.Page.Index > 0) this.Page.Index--;
    else this.Page.Index = 0;
    this.Page.Pages = [];
    this.Page.TotalPages = Math.ceil(this.Page.TotalData / this.Page.Size);
    for (let i = 0; i < this.Page.TotalPages; i++) {
      this.Page.Pages[i] = new paging();
      this.Page.Pages[i].id = i + 1;
    }
    if (this.Page.TotalPages > 0) this.pagingIndex(this.Page.Index);

  }
  pagingIndex(index: number) {
    for (let i = 0; i < this.Page.TotalPages; i++) {
      this.Page.Pages[i].isActived = false;
      this.Page.Pages[i].show = false;
    }
    this.Page.Pages[index].isActived = true;
    this.Page.Pages[index].show = true;
    this.Page.Index = this.Page.Pages[index].id;
    if (this.Page.TotalPages < this.Page.VisiblePage) {
      for (let i = 0; i < this.Page.TotalPages; i++) {
        this.Page.Pages[i].show = true;
      }
    }
    else {
      if (this.Page.Index - 2 > 0 && this.Page.Index + 1 < this.Page.TotalPages) {
        for (let i = this.Page.Index - 3; i < this.Page.Index + 2; i++) {
          this.Page.Pages[i].show = true;
        }
      }
      else if (this.Page.Index - 2 <= 0) {
        for (let i = 0; i < this.Page.VisiblePage; i++) {
          this.Page.Pages[i].show = true;
        }
      }
      else if (this.Page.Index + 2 >= this.Page.TotalPages) {
        for (let i = this.Page.TotalPages - this.Page.VisiblePage; i < this.Page.TotalPages; i++) {
          this.Page.Pages[i].show = true;
        }
      }
    }
    this.onChange.emit(this.Page);
  }
  NextPage() {
    if (this.Page.Index < this.Page.TotalPages) {
      this.Page.Index++;
      this.pagingIndex(this.Page.Index - 1);
    }
  }
  PreviousPage() {
    if (this.Page.Index > 1) {
      this.Page.Index--;
      this.pagingIndex(this.Page.Index - 1);
    }
  }
  FirstPage() {
    this.Page.Index = 0;
    this.pagingIndex(this.Page.Index);
  }
  LastPage() {
    this.Page.Index = this.Page.TotalPages - 1;
    this.pagingIndex(this.Page.Index);
  }
  
  ChangePage(event: any) {
    this.Page.Size = event.target.value;
    this.Page.Index = 0;
    this.Reload();
  }
}
@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    pagingComponent
  ],
  declarations: [
    pagingComponent
  ]
})
export class PagingModule { }
