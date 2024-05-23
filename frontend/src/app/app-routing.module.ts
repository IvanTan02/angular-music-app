import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from '@angular/router';
import { AuthRedirectComponent } from "./shared/auth/auth-redirect.component";
import { LayoutComponent } from "./modules/core/layout/layout.component";
import { HomeGuard } from "./shared/guards/home.guard";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [HomeGuard],
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    }, 
    {
        path: 'auth',
        component: AuthRedirectComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }