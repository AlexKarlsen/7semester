import { User } from './user';
import { Injectable } from '@angular/core';

// Is an injectable service like described in 
// https://angular.io/tutorial/toh-pt4
@Injectable()
export class AuthenticationService
{
    model = new User();
    isLoggedInBool = false;
    
    constructor() {
        this.isLoggedInBool = this.isLoggedIn();
    }

    public saveToken(token:string) {
        window.localStorage['JW-token'] = token;
    }

    public getToken() {
        if(window.localStorage['JW-token']) {
            return window.localStorage['JW-token'];
        } 
        else {
            return '';
        }
    }

    public deleteToken() {
        window.localStorage.removeItem('JW-token');
    }

    public isLoggedIn() {
        const token = this.getToken();
        if(token) {
            //const payload = JSON.parse(window.atob(token.split('.')[1]));
            //return payload.exp > Date.now() / 1000;
            // idk why that needs to be that complex. Am I not logged in if a token exists?
            return true;
        } 
        else {
            return false;
        }
    }

    public currentUser(): User {
        if (this.isLoggedIn()) {
            const token = this.getToken();
            const payload = JSON.parse(window.atob(token.split('.')[1]));
            const user = new User();
            user.name = payload.name;
            user.email = payload.email;
            
            return user;
        }
        else { 
            return; 
        }
    }
}