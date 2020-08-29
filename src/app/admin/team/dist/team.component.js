"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TeamComponent = void 0;
var core_1 = require("@angular/core");
var TeamComponent = /** @class */ (function () {
    function TeamComponent(teamService, responseMessage) {
        this.teamService = teamService;
        this.responseMessage = responseMessage;
        this.academies = [];
        this.listOfDisplayData = [];
        this.pageIndex = 1;
        this.pageSize = 10;
        this.total = 1;
        this.listOfData = [];
        this.loading = true;
        this.sortValue = null;
        this.sortKey = null;
        this.searchGenderList = [];
        this.search = {};
    }
    TeamComponent.prototype.sort = function (sort) {
        this.sortKey = sort.key;
        this.sortValue = sort.value;
        this.searchData();
    };
    TeamComponent.prototype.setSearch = function () {
        this.search.id = '';
        this.search.name = '';
        this.search.slug = '';
        this.search.status = '';
    };
    TeamComponent.prototype.searchData = function (reset) {
        var _this = this;
        if (reset === void 0) { reset = false; }
        if (reset) {
            this.pageIndex = 1;
        }
        this.loading = true;
        this.teamService
            .index()
            .subscribe(function (data) {
            _this.loading = false;
            _this.total = data.data.length;
            _this.listOfData = data.data;
        });
    };
    TeamComponent.prototype.updateFilter = function (value) {
        this.searchGenderList = value;
        this.searchData(true);
    };
    TeamComponent.prototype.ngOnInit = function () {
        this.setSearch();
        this.searchData();
    };
    TeamComponent.prototype["delete"] = function (id) {
        var _this = this;
        this.teamService.distroy(id).subscribe(function (result) { return _this.handleResponse(result); }, function (error) { return _this.handleError(error); });
    };
    TeamComponent.prototype.handleResponse = function (data) {
        if (data.status == true) {
            this.responseMessage.success(data.message, { nzDuration: 2000 });
            this.searchData();
        }
        else {
            this.responseMessage.error(data.message, { nzDuration: 2000 });
        }
    };
    TeamComponent.prototype.handleError = function (error) {
        this.responseMessage = error.error.message.errors;
    };
    TeamComponent = __decorate([
        core_1.Component({
            selector: 'app-team',
            templateUrl: './team.component.html'
        })
    ], TeamComponent);
    return TeamComponent;
}());
exports.TeamComponent = TeamComponent;
