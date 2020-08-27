"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClubService = void 0;
var core_1 = require("@angular/core");
var ClubService = /** @class */ (function () {
    function ClubService(api) {
        this.api = api;
    }
    ClubService.prototype.create = function (data) {
        return this.api.post("club/create", data);
    };
    ClubService.prototype.update = function (data) {
        return this.api.put("club/update", data);
    };
    ClubService.prototype.distroy = function (id) {
        return this.api["delete"]("club/distroy/" + id);
    };
    ClubService.prototype.distroy_multiple = function (ids) {
        return this.api.post("club/distroy/multiple", ids);
    };
    ClubService.prototype.index = function () {
        return this.api.get("club");
    };
    ClubService.prototype.get = function (id) {
        return this.api.get("club/" + id);
    };
    ClubService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], ClubService);
    return ClubService;
}());
exports.ClubService = ClubService;
