import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(homeRoutes)]
})
export class HomeModule {}