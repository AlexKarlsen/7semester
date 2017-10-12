import { Component, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { AuthenticationService } from './authentication.service';

interface AuthResponse {
    token : string;
}

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
})

export class LoginFormComponent{
    @Input() user: User;
    
    constructor(private http: HttpClient, private auth: AuthenticationService) {}
        model = new User();

        submitted = false;
    
        onSubmit() { this.submitted = true; }
    
        newUser(): void {
            console.log(this.model);
            this.login(this.model);
        }

        logout(): void {
            this.auth.deleteToken();

            this.auth.isLoggedInBool = false;
        }

        private login(user: User) {
            //const url = 'https://peaceful-temple-74079.herokuapp.com/auth/login';
            const url = 'http://localhost:3000/auth/login';
    
            this.http.post<AuthResponse>(url, user).subscribe(data => {
                console.log('Something good happened');
                this.auth.saveToken(data.token);
                this.auth.isLoggedInBool = true;
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
                    console.log('Backend returned code ' + err.status + ', body was: ' + err.error);
                }
                return false;
            });
        }
}