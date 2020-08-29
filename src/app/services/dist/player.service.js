"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlayerService = void 0;
var core_1 = require("@angular/core");
var PlayerService = /** @class */ (function () {
    function PlayerService(api) {
        this.api = api;
    }
    PlayerService.prototype.create = function (data) {
        return this.api.post("player/create", data);
    };
    PlayerService.prototype.update = function (data) {
        return this.api.put("player/update", data);
    };
    PlayerService.prototype.distroy = function (id) {
        return this.api["delete"]("player/distroy/" + id);
    };
    PlayerService.prototype.distroy_multiple = function (ids) {
        return this.api.post("player/distroy/multiple", ids);
    };
    PlayerService.prototype.index = function () {
        return this.api.get("player");
    };
    PlayerService.prototype.get = function (id) {
        return this.api.get("player/" + id);
    };
    PlayerService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
