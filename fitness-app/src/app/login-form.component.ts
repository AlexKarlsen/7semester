import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Authentication } from './authentication';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
})

export class LoginFormComponent{
    @Input() user: User;
    
    constructor(private http: HttpClient) {}
    
        auth = new Authentication(this.http);
        model = new User();

        isLoggedInBool = this.auth.isLoggedIn();

        submitted = false;
    
        onSubmit() { this.submitted = true; }
    
        newUser(): void {
            console.log(this.model);
            this.auth.login(this.model);

            //Should check if login failed before setting this
            this.isLoggedInBool = true;
        }

        logout(): void {
            this.auth.deleteToken();

            this.isLoggedInBool = false;
        }
}