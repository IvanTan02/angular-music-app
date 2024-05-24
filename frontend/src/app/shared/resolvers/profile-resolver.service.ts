// profile.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../../modules/profile/profile.service';
import { SpotifyProfileDetails } from '../../models/auth.model';

@Injectable({
    providedIn: 'root',
})
export class ProfileResolver implements Resolve<any> {
    constructor(private profileService: ProfileService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<SpotifyProfileDetails> {
        return this.profileService.initProfileDetails();
        // TODO: catch error
    }
}
