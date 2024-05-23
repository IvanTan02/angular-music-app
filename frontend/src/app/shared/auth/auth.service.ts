import { Injectable } from "@angular/core";
import { SpotifyAuthCredentials } from "../../models/auth.model";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "../services/storage.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _accessToken?: string;
    private _refreshToken?: string;
    private _tokenExpiration?: number;
    private _isAuthenticated: boolean = false;

    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    public get accessToken(): string {
        return this._accessToken;
    }

    public get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    public set isAuthenticated(data: boolean) {
        this._isAuthenticated = data;
    }

    initCredentials(credentials: SpotifyAuthCredentials): void {
        this._accessToken = credentials.accessToken;
        this._refreshToken = credentials.refreshToken;
        this._tokenExpiration = credentials.tokenExpiration;
        this._isAuthenticated = true;

        const tokenExpiryTime = (this._tokenExpiration - 120) * 1000;
        this.storageService.set('spotifyAccessToken', this._accessToken, tokenExpiryTime);
        this.storageService.set('spotifyRefreshToken', this._refreshToken);

        this.initSessionInterval(tokenExpiryTime);
    }

    tryAutoLogin(): void {
        this._isAuthenticated = this.storageService.get('spotifyAccessToken') ? true : false;
    }

    private initSessionInterval(refreshInterval: number): void {
        setInterval(() => {
            this.refreshAccessToken();
        }, refreshInterval);
    }

    private refreshAccessToken(): void {
        console.log('REFRESH ACCESS TOKEN')
        this.http.post('http://localhost:3001/refresh', { refreshToken: this._refreshToken }).subscribe({
            next: (response: any) => {
                const tokenExpiryTime = (response.expiresIn - 120) * 1000;
                this.storageService.set('spotifyAccessToken', response.accessToken, tokenExpiryTime);
            }
        })
    }
}