import { Injectable } from "@angular/core";
import { SpotifyAuthCredentials } from "../../models/auth.model";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "../services/storage.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _accessToken?: string;
    private _refreshToken?: string;
    private _tokenExpiration?: number;
    private _isAuthenticated: boolean = false;

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient, private storageService: StorageService, private router: Router) {
    }

    public get accessToken(): string {
        if (this._accessToken) return this._accessToken;
        return this.storageService.get('spotifyAccessToken');
    }

    public get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    public set isAuthenticated(data: boolean) {
        this._isAuthenticated = data;
    }

    setAuthenticated(isAuthenticated: boolean) {
        this.isAuthenticatedSubject.next(isAuthenticated);
    }

    initCredentials(credentials: SpotifyAuthCredentials): void {
        this._accessToken = credentials.accessToken;
        this._refreshToken = credentials.refreshToken;
        this._tokenExpiration = credentials.tokenExpiration;
        this._isAuthenticated = true;
        this.setAuthenticated(true);

        const tokenExpiryTime = (this._tokenExpiration - 120) * 1000;
        this.storageService.set('spotifyAccessToken', this._accessToken, tokenExpiryTime);
        this.storageService.set('spotifyRefreshToken', this._refreshToken);

        this.initSessionInterval(tokenExpiryTime);
    }

    tryAutoLogin(): void {
        const accessToken = this.storageService.get('spotifyAccessToken');
        if (accessToken) this._accessToken = accessToken;
        this._isAuthenticated = accessToken ? true : false;
    }

    logoutUser(): void {
        this.storageService.delete('spotifyAccessToken');
        this.storageService.delete('spotifyRefreshToken');
        this._isAuthenticated = false;
        this.setAuthenticated(false);
        this.router.navigate['/'];
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