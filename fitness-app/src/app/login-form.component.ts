import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
})

export class LoginFormComponent{
    @Input() user: User;
    
    constructor(private http: HttpClient, private auth: AuthenticationService) {
        //this.isLoggedInBool = this.auth.isLoggedIn();
        //console.log(this.auth.isLoggedIn());
    }
    
        //auth = new Authentication(this.http);
        model = new User();

        //isLoggedInBool = false;
        
        submitted = false;
    
        onSubmit() { this.submitted = true; }
    
        newUser(): void {
            console.log(this.model);
            this.auth.login(this.model);

            //Should check if login failed before setting this
            this.auth.isLoggedInBool = true;
        }

        logout(): void {
            this.auth.deleteToken();

            this.auth.isLoggedInBool = false;
        }
}