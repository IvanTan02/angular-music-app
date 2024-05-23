import { Injectable } from "@angular/core";
import { SpotifyAuthCredentials } from "../../models/auth.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _accessToken?: string;
    private _refreshToken?: string;
    private _tokenExpiration?: number;
    private _isAuthenticated: boolean = false;

    constructor(private http: HttpClient) { }

    initCredentials(credentials: SpotifyAuthCredentials) {
        this._accessToken = credentials.accessToken;
        this._refreshToken = credentials.refreshToken;
        this._tokenExpiration = credentials.tokenExpiration;
        this.initSessionInterval();
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

    private initSessionInterval() {
        const authExpiryTime = new Date().getTime() + this._tokenExpiration * 1000;
        //localStorage.setItem('authExpire', new Date().getTime())

        const refreshInterval = (this._tokenExpiration - 120) * 1000;
        setInterval(() => {
            this.refreshAccessToken();
        }, 100000);
    }

    private refreshAccessToken() {
        console.log('REFRESH ACCESS TOKEN')
        this.http.post('http://localhost:3001/refresh', { refreshToken: this._refreshToken }).subscribe({
            next: (response) => {
                console.log(response);
                //this._accessToken = response['accessToken'];
            }
        })
    }
}