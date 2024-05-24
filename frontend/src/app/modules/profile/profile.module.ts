import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";

const profileRoutes: Routes = [
    {
        path: '',
        component: ProfileComponent,
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(profileRoutes)]
})
export class ProfileModule { }