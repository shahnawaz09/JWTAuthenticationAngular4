import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoggedIn:boolean;
  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit() {
   
    this.subscription = this.authService.isLoggedIn.subscribe(data => {
      var valid = JSON.parse(localStorage.getItem('currentUser'));
      if(valid !== null && data === false){

        this.isLoggedIn = true;
      }
      else if(valid !== null && data === true){
        this.isLoggedIn = true;
      }
      else if(valid === null && data === false){
        this.isLoggedIn = false;
      }
    });
  }

  logout(): void{
    localStorage.removeItem('currentUser');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
