import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from './Loader.service';
import { Subscription } from 'rxjs';
import { LoaderState } from './Loader';

@Component({
  selector: 'app-loading',
  templateUrl: 'Loader.component.html'
})
export class LoadingComponent implements OnInit {
  constructor(private loaderService: LoaderService) { }
  
  show: boolean = false;
  private subscription: Subscription;
  
  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState)=>{
      this.show = state.show;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
