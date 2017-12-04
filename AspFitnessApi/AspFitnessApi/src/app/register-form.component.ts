import { Component, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { AuthenticationService } from './authentication.service';
import { Http } from '@angular/http';

interface AuthResponse {
    token : string;
}

@Component({
    selector: 'register-form',
    templateUrl: './register-form.component.html',
})

export class RegisterFormComponent{
    @Input() user: User;
    // Inject Authentication into your component or service.
    constructor(private http: Http, private auth: AuthenticationService) {}
    model = new User();
    
    submitted = false;
    
    onSubmit() { this.submitted = true; }
    
    newUser(): void {
        console.log(this.model);
        this.register(this.model);
        console.log('post request sent');
    }

    private register(user: User) {
        //const url = 'https://peaceful-temple-74079.herokuapp.com/auth/register';
        const url = '/api/accounts/register';

        this.http.post(url, user).subscribe(data => {
            console.log('Something good happened');
            this.auth.saveToken(data.json());
            this.auth.isLoggedInBool = true;
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
}
