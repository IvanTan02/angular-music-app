import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlayerComponent } from "./player.component";

const playerRoutes: Routes = [
    {
        path: '',
        component: PlayerComponent,
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(playerRoutes)]
})
export class PlayerModule { }