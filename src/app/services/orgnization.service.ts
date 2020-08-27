import { Injectable } from "@angular/core";
import { ApiClient } from "../common/api.client";

@Injectable({
    providedIn: "root",
})

export class OrgnizationService {
    constructor(private api: ApiClient) { }

    create(data) {
        return this.api.post("orgnization/create", data);
    }

    update(data) {
        return this.api.put("orgnization/update", data);
    }

    distroy(id) {
        return this.api.delete("orgnization/distroy/" + id);
    }

    distroy_multiple(ids) {
        return this.api.post("orgnization/distroy/multiple", ids);
    }

    index() {
        return this.api.get("orgnization");
    }

    get(id) {
        return this.api.get("orgnization/" + id);
    }
}
