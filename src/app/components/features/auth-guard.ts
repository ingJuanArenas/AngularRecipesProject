import { inject } from "@angular/core";
import { authService } from "./auth-service";
import { Router } from "@angular/router";


export function authGuard(){
    const service = inject(authService);
    const router = inject(Router);

    if(service.isAuthenticated()){
        return true;
    }

    router.navigate(['/login']);
    return false;
}