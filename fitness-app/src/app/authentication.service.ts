import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { Injectable } from '@angular/core';

interface AuthResponse {
    token : string;
}

// Is a service like described in 
// https://angular.io/tutorial/toh-pt4
@Injectable()
export class AuthenticationService
{
    model = new User();

    private saveToken(token:string) {
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

    isLoggedInBool = false;

    constructor(private http: HttpClient) {
        this.isLoggedInBool = this.isLoggedIn();
    }

    public register(user: User) {
        //const url = `https://peaceful-temple-74079.herokuapp.com/auth/register`;
        const url = 'http://localhost:3000/auth/register';

        this.http.post<AuthResponse>(url, user).subscribe(data => {
            console.log('Something good happened');
            this.saveToken(data.token);
            return true;
        },
        // Errors will call this callback instead:
        (err: HttpErrorResponse) => {
            if(err.error instanceof Error) {
                // A client - side or network error occurred. Handle it accordingly.
                console.log('An error occurred: ', err.error.message);
            } 
            else
            {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.log('Backend returned code ' + err.status + ', body was: ' + err.error);
            }
            return false;
        });
    }

    public login(user: User) {
        //const url = `https://peaceful-temple-74079.herokuapp.com/auth/login`;
        const url = 'http://localhost:3000/auth/login';

        this.http.post<AuthResponse>(url, user).subscribe(data => {
            console.log('Something good happened');
            this.saveToken(data.token);
            return true;
        },
        // Errors will call this callback instead:
        (err: HttpErrorResponse) => {
            if(err.error instanceof Error) {
                // A client - side or network error occurred. Handle it accordingly.
                console.log('An error occurred:', err.error.message);
            } 
            else
            {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.log('Backend returned code' + err.status + ', body was: ' + err.error);
            }
            return false;
        });
    }
}