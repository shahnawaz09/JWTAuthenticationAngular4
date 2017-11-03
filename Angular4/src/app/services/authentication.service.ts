import { Injectable} from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    private loggedIn = new BehaviorSubject<boolean>(false);
    public isLoggedIn = this.loggedIn.asObservable();

    constructor(private _http: HttpClient){}

    login(username:any, password:any): Observable<boolean> {
        let credentials = {
            username:username,
            password:password
        };

        return this._http.post('http://localhost:8084/RestApi/webapi/api/Timesheet/Authenticate', credentials,{observe:'response',responseType:'text'})
            .map(response => {
               var res  = JSON.parse(response.body);
              
                if(res.token){
                    this.loggedIn.next(true);

                    setTimeout( () => {
                        localStorage.setItem('currentUser',JSON.stringify({token:res.token,username:credentials.username}))
                       
                    },100);
                   
                    return true;
                   
                }
                else{
                    return false;
                }
            });

    }

    logout() : void{
        this.loggedIn.next(false);
        // localStorage.removeItem('currentUser');
    }
}