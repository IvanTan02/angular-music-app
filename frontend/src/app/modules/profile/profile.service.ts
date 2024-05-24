import { Injectable } from "@angular/core";
import SpotifyWebApi from 'spotify-web-api-node';
import { AuthService } from "../../shared/auth/auth.service";
import { SpotifyProfileDetails } from "../../models/auth.model";

@Injectable({ providedIn: 'root' })
export class ProfileService {

    private spotifyWebApi: SpotifyWebApi = new SpotifyWebApi();
    private _profileDetails: SpotifyProfileDetails;

    constructor(private authService: AuthService) {
        console.log(this.authService.accessToken);
        this.spotifyWebApi.setAccessToken(this.authService.accessToken);
        this.initProfileDetails();
    }

    public get profileDetails() {
        return this._profileDetails;
    }

    initProfileDetails() {
        this.spotifyWebApi.getMe().then((response) => {
            this._profileDetails = response.body;
            console.log(this._profileDetails);
        });
    }
}