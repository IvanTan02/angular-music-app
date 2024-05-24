import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from '@angular/router';
import { AuthRedirectComponent } from "./shared/auth/auth-redirect.component";
import { LayoutComponent } from "./modules/core/layout/layout.component";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'auth',
        component: AuthRedirectComponent
    },
    {
        path: 'profile',
        component: LayoutComponent,
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }