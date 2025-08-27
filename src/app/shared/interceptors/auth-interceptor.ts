import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, finalize, Observable, tap, throwError } from "rxjs";


export function authInterceptor(
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('access_token');
    let request = req;

    if(token){
        request= req.clone({
            setHeaders:{
                Authorization: `Bearer ${token}`
            }
        })
    }

    return next(request);
    
}

export function errorInterceptor(
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>>{

    const router = inject(Router);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            switch(error.status){
                case 401:
                    // Unauthorized
                    // Redirigir al usuario a la página de login
                    router.navigate(['/auth/login']);
                    break;
                case 403:
                    // Forbidden
                    // Redirigir al usuario a una página de acceso denegado o mostrar un mensaje
                    router.navigate(['/auth/access-denied']);
                    break;
                case 404:
                    // Not Found
                    // Redirigir a una página de no encontrado
                    router.navigate(['/not-found']);
                    break;
                case 500:
                    // Internal Server Error
                    // Redirigir a una página de error del servidor
                    router.navigate(['/server-error']);
                    break;
                default:
                    // Otros errores
                    break;
            }
            
            
            console.error("Ha ocurrido un error en la petición HTTP:", error);
            return throwError(() => error);
        })
    );
}