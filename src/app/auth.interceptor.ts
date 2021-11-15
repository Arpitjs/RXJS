import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGE1MDQ1MDRiMTRjMzU2MDIyMzJmMSIsImlhdCI6MTYzNjQ1NDQ4MH0._Ds4281XIwPyfY5gPy0TUH12FfQ8T4dQBr-4YN94bv4'
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let req = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.token}`
            }
        })
        console.log(req)
        return next.handle(req)
    }
}