import { Injectable } from "@angular/core";
import { SpotifyAuthCredentials } from "../../models/auth.model";

@Injectable({providedIn: 'root'})
export class AuthService {
    private _accessToken?: string;
    private _refreshToken?: string;
    private _tokenExpiration?: number;
    private _isAuthenticated: boolean = false;

    initCredentials(credentials: SpotifyAuthCredentials) {
        this._accessToken = credentials.accessToken;
        this._refreshToken = credentials.refreshToken;
        this._tokenExpiration = credentials.tokenExpiration;
        this._isAuthenticated = true;
    }

    public get accessToken(): string {
        return this._accessToken;
    }

    public get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }
}