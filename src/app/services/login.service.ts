import { Injectable } from "@angular/core";
import { ApiClient } from "../common/api.client";

@Injectable({
    providedIn: "root",
})

export class LoginService {
    constructor(private api: ApiClient) { }

    login(data) {
        return this.api.post("auth/admin/login", data);
    }
}
