import { NgModule, inject } from "@angular/core";
import { RouterModule, provideRouter } from "@angular/router";
import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { AuthGuard } from "./shared/auth/auth.guard";
import { LayoutComponent } from "./modules/core/layout/layout.component";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    }, 
    {
        path: 'auth',
        canActivate: [AuthGuard],
        component: LayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }