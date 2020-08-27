import { Injectable } from "@angular/core";
import { ApiClient } from "../common/api.client";

@Injectable({
    providedIn: "root",
})

export class TeamService {
    constructor(private api: ApiClient) { }

    create(data) {
        return this.api.post("team/create", data);
    }

    update(data) {
        return this.api.put("team/update", data);
    }

    distroy(id) {
        return this.api.delete("team/distroy/" + id);
    }

    distroy_multiple(ids) {
        return this.api.post("team/distroy/multiple", ids);
    }

    index() {
        return this.api.get("team");
    }

    get(id) {
        return this.api.get("team/" + id);
    }
}
