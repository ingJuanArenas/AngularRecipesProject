import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "recipes",
        pathMatch:'full',
    },{
        path: "recipes",
        loadChildren: () => import('./components/recipes-route').then(r => r.recipes_routes)
    }
];
