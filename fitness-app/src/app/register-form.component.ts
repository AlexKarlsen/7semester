import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './user';

interface AuthResponse {
    token : string;
}

export class Authentication
{
    private saveToken(token:string) {
        window.localStorage['JW-token'] = token;
    }
    private getToken(token: string) {
        if(window.localStorage['JW-token']) {
            return window.localStorage['JW-token'];
        } 
        else
        {
            return '';
        }
    }

    constructor(private http: HttpClient) {}

    public register(user: User) {
        //const url = `https://peaceful-temple-74079.herokuapp.com/auth/register`;
        const url = `https://localhosts:3000/auth/register`;
        this.http.post<AuthResponse>(url, user).subscribe(data => {
            console.log('Something happened');
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
                console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
            return false;
        });
    }
}
