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
    // Inject Authentication into your component or service.
    constructor(private http: HttpClient) {}
    
        auth = new Authentication(this.http);
        model = new User();
    
        submitted = false;
    
        onSubmit() { this.submitted = true; }
    
        newUser(): void {
            console.log(this.model);
            this.auth.login(this.model);
            console.log('post request sent');
        }
}