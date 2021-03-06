import {Component} from '@angular/core';
import { AuthenticationService } from '../../fake-db/authentication.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(
    private authenticationService: AuthenticationService
  ){

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  LogOut(){
    this.authenticationService.logout();
  }
}
