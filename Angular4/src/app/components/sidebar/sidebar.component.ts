import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/authentication.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoggedIn: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
   
    this.subscription = this.authService.isLoggedIn.subscribe(data => {
      var valid = JSON.parse(localStorage.getItem('currentUser'));

      if (valid !== null && data === false) {

        this.isLoggedIn = true;
      }
      else if (valid !== null && data === true) {
        this.isLoggedIn = true;
      }
      else if(valid === null && data === false){
        this.isLoggedIn = false;
      }
    });

  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
