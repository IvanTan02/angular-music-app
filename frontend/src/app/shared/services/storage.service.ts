import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StorageService {

    set(key: string, value: any, ageInSeconds?: number): void {
        const valueString = JSON.stringify({
            value,
            expiresAt: ageInSeconds ? Date.now() + (ageInSeconds * 1000) : 0,
        });
        localStorage.setItem(key, valueString);
    }

    get(key: string): any {
        const item = localStorage.getItem(key);
        if (item) {
            const itemObject = JSON.parse(item);
            if (itemObject.expiresAt > 0 && itemObject.expiresAt <= Date.now()) {
                this.delete(key); // remove item if expired
                return undefined;
            }
            return itemObject.value;
        } else {
            return undefined;
        }
    }

    delete(key: string): void {
        localStorage.removeItem(key);
    }
}