import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from 'rxjs';
import { LoaderState } from './Loader';

@Injectable({
    providedIn: 'root'
})

export class LoaderService {
    LoaderState: LoaderState = new LoaderState();
    private loaderSubject = new BehaviorSubject(this.LoaderState);
    loaderState = this.loaderSubject.asObservable();
    
    constructor(){}

    show(){
        this.LoaderState.show = true;
        this.loaderSubject.next(this.LoaderState);
    }   
    hide(){
        this.LoaderState.show = false;;
        this.loaderSubject.next(this.LoaderState);
    }
}