
export interface SpotifyAuthCredentials {
    accessToken: string;
    refreshToken: string;
    tokenExpiration: number;
}

export interface SpotifyProfileDetails {
    country: string;
    display_name: string;
    email: string;
    href: string;
    id: string;
    product: string;
    type: string;
    uri: string;
    external_urls: {
        spotify: string;
    };
    images: {
        height: number;
        url: string;
        width: number;
    }[];
}

