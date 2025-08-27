import { Routes } from '@angular/router';
import { authGuard } from './components/features/auth-guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "recipes",
        pathMatch:'full',
    },{
        path: "recipes",
        loadChildren: () => import('./components/recipes-route').then(r => r.recipes_routes),
        canActivate: [authGuard]
    },{
        path: "login",
        loadComponent: () => import('./components/login/login').then(r => r.Login)
    }
];
