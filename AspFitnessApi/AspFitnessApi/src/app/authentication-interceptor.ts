import{ Injectable } from '@angular/core';
import{ HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import{ Observable } from 'rxjs/Observable';
import{ AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.auth.isLoggedIn()) {
            // Get the auth header from the service
            const authHeader = 'Bearer ' + this.auth.getToken();
            // Clone the request to add the new header
            //const authReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
            const authReq = req.clone({ setHeaders: { Authorization: authHeader } });
    
            console.log('Auth header added');
            // Pass on the cloned request instead of the original request
            return next.handle(authReq);
        }
        else
        {
            return next.handle(req);
        }
    }
}