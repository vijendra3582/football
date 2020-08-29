import { Injectable } from "@angular/core";
import { ApiClient } from "../common/api.client";

@Injectable({
    providedIn: "root",
})

export class PlayerService {
    constructor(private api: ApiClient) { }

    create(data) {
        return this.api.post("player/create", data);
    }

    update(data) {
        return this.api.put("player/update", data);
    }

    distroy(id) {
        return this.api.delete("player/distroy/" + id);
    }

    distroy_multiple(ids) {
        return this.api.post("player/distroy/multiple", ids);
    }

    index() {
        return this.api.get("player");
    }

    get(id) {
        return this.api.get("player/" + id);
    }
}
