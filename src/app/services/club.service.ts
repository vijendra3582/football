import { Injectable } from "@angular/core";
import { ApiClient } from "../common/api.client";

@Injectable({
    providedIn: "root",
})

export class ClubService {
    constructor(private api: ApiClient) { }

    create(data) {
        return this.api.post("club/create", data);
    }

    update(data) {
        return this.api.put("club/update", data);
    }

    distroy(id) {
        return this.api.delete("club/distroy/" + id);
    }

    distroy_multiple(ids) {
        return this.api.post("club/distroy/multiple", ids);
    }

    index() {
        return this.api.get("club");
    }

    get(id) {
        return this.api.get("club/" + id);
    }
}
