import { Injectable } from "@angular/core";
import SpotifyWebApi from 'spotify-web-api-node';
import { AuthService } from "../../shared/auth/auth.service";
import { SpotifyProfileDetails } from "../../models/auth.model";

@Injectable({ providedIn: 'root' })
export class ProfileService {

    private spotifyWebApi: SpotifyWebApi = new SpotifyWebApi();
    private _profileDetails: SpotifyProfileDetails;

    constructor(private authService: AuthService) {
        this.spotifyWebApi.setAccessToken(this.authService.accessToken);
    }

    public get profileDetails() {
        return this._profileDetails;
    }

    initProfileDetails(): Promise<SpotifyProfileDetails> {
        return this.spotifyWebApi.getMe().then((response) => {
            this._profileDetails = response.body;
            return this._profileDetails;
        });
    }
}