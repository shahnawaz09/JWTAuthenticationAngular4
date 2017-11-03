import { Component, OnInit,  ChangeDetectorRef} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  usernameFormControl: any;
  passwordFormControl: any;

  constructor(private authService: AuthService, private router : Router, private ref : ChangeDetectorRef) { }

  ngOnInit() {
    this.validation();
  }

  // @HostBinding('style.background-color')   bgColor = 'black';
 
  validation(): void {
    this.usernameFormControl = new FormControl('', [
      Validators.required
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required
    ]);
    
  }

  login(){

    this.authService.login(this.username, this.password).subscribe(result =>{
    
      if(result === true){
       
        this.router.navigate(['/home']);
        this.ref.detectChanges();
      }
      else{
        alert("Username or Password is incorrect!");
      }
    });
 
  }


}
