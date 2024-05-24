import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { ProfileResolver } from "../../shared/resolvers/profile-resolver.service";

const profileRoutes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        resolve: {
            userProfile: ProfileResolver
        }
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(profileRoutes)]
})
export class ProfileModule { }