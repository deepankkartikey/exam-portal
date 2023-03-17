import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptor implements HttpInterceptor{

    constructor(private login: LoginService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add jwt token from local storage to request
        let authReq = req;
        const token = this.login.getToken();
        // console.log("Inside INterceptor"+ JSON.stringify(req))
        if(token != null){
            authReq = authReq.clone({setHeaders: {Authorization: `Bearer ${token}`},
            })
        }
        return next.handle(authReq);      
        throw new Error("Method not implemented.");
    }
    
}

export const authInterceptorProviders = [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}]