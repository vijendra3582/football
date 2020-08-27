"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddEditTeamComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validators_1 = require("src/app/validations/custom.validators");
var AddEditTeamComponent = /** @class */ (function () {
    function AddEditTeamComponent(fb, locationService, clubService, teamService, router, activatedRoute, responseMessage) {
        this.fb = fb;
        this.locationService = locationService;
        this.clubService = clubService;
        this.teamService = teamService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.responseMessage = responseMessage;
        this.team = {};
        this.countries = [];
        this.states = [];
        this.clubs = [];
        this.cities = [];
        this.country = 101;
        this.submitted = false;
        this.server_message = {};
        this._id = undefined;
    }
    AddEditTeamComponent.prototype.ngOnInit = function () {
        this._id = this.activatedRoute.snapshot.paramMap.get('id');
        this.getState();
        this.getClubs();
        this.setValue();
        if (this._id) {
            this.getteam(this._id);
            this.setFormEdit();
        }
        else {
            this.setValue();
            this.setForm();
        }
    };
    AddEditTeamComponent.prototype.getState = function () {
        var _this = this;
        var country_id = this.country;
        if (!country_id) {
            return;
        }
        this.locationService.getState(country_id).subscribe(function (result) {
            _this.states = result.data;
        });
    };
    AddEditTeamComponent.prototype.getCity = function () {
        var _this = this;
        var state_id = this.team.state.id;
        if (!state_id) {
            return;
        }
        this.locationService.getCity(state_id).subscribe(function (result) {
            _this.cities = result.data;
        });
    };
    AddEditTeamComponent.prototype.setStateData = function () {
        var state_id = this.team.state.id;
        var state = this.states.find(function (el) {
            return el.id == state_id;
        });
        if (state) {
            this.team.state.name = state.name;
        }
    };
    AddEditTeamComponent.prototype.setCityData = function () {
        var city_id = this.team.city.id;
        var city = this.cities.find(function (el) {
            return el.id == city_id;
        });
        if (city) {
            this.team.city.name = city.name;
        }
    };
    AddEditTeamComponent.prototype.getClubs = function () {
        var _this = this;
        this.clubService.index().subscribe(function (data) {
            _this.clubs = data.data;
        });
    };
    AddEditTeamComponent.prototype.setOrgnization = function () {
        var club_id = this.team.clubId;
        var club = this.clubs.find(function (el) {
            return el._id == club_id;
        });
        if (club) {
            this.team.orgnizationId = club._id;
        }
    };
    AddEditTeamComponent.prototype.getteam = function (_id) {
        var _this = this;
        this.teamService.get(_id).subscribe(function (data) {
            _this.team = data.data[0];
            _this.team.clubId = data.data[0].clubId[0];
        });
    };
    AddEditTeamComponent.prototype.setValue = function () {
        this.team = {};
        this.team.name = '';
        this.team.ownerName = '';
        this.team.headCoachName = '';
        this.team.email = '';
        this.team.phoneNumber = '';
        this.team.password = '';
        this.team.ownerPhoneNumber = '';
        this.team.numberOfPlayer = '';
        this.team.orgnizationId = '';
        this.team.clubId = '';
        this.team.ground = '';
        this.team.state = { "id": 0, "name": "" };
        this.team.city = { "id": 0, "name": "" };
        this.team.address = '';
    };
    AddEditTeamComponent.prototype.setForm = function () {
        this.form = this.fb.group({
            name: new forms_1.FormControl(this.team.name, [forms_1.Validators.required]),
            ownerName: new forms_1.FormControl(this.team.ownerName, []),
            headCoachName: new forms_1.FormControl(this.team.headCoachName, []),
            email: new forms_1.FormControl(this.team.email, [forms_1.Validators.required, forms_1.Validators.email]),
            phoneNumber: new forms_1.FormControl(this.team.phoneNumber, [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10), custom_validators_1.ValidateNumber]),
            ownerPhoneNumber: new forms_1.FormControl(this.team.ownerPhoneNumber, [forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10), custom_validators_1.ValidateNumber]),
            password: new forms_1.FormControl(this.team.password, [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(40)]),
            numberOfPlayer: new forms_1.FormControl(this.team.numberOfPlayer, [custom_validators_1.ValidateNumber]),
            // orgnizationId: new FormControl(this.team.orgnizationId, [Validators.required]),
            clubId: new forms_1.FormControl(this.team.clubId, [forms_1.Validators.required]),
            ground: new forms_1.FormControl(this.team.ground, []),
            state: new forms_1.FormControl(this.team.state, []),
            city: new forms_1.FormControl(this.team.city, []),
            address: new forms_1.FormControl(this.team.address, [])
        });
    };
    AddEditTeamComponent.prototype.setFormEdit = function () {
        this.form = this.fb.group({
            name: new forms_1.FormControl(this.team.name, [forms_1.Validators.required]),
            ownerName: new forms_1.FormControl(this.team.ownerName, []),
            headCoachName: new forms_1.FormControl(this.team.headCoachName, []),
            email: new forms_1.FormControl(this.team.email, [forms_1.Validators.required, forms_1.Validators.email]),
            phoneNumber: new forms_1.FormControl(this.team.phoneNumber, [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10), custom_validators_1.ValidateNumber]),
            ownerPhoneNumber: new forms_1.FormControl(this.team.ownerPhoneNumber, [forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10), custom_validators_1.ValidateNumber]),
            password: new forms_1.FormControl(null),
            numberOfPlayer: new forms_1.FormControl(this.team.numberOfPlayer, [custom_validators_1.ValidateNumber]),
            // orgnizationId: new FormControl(this.team.orgnizationId, [Validators.required]),
            clubId: new forms_1.FormControl(this.team.clubId, [forms_1.Validators.required]),
            ground: new forms_1.FormControl(this.team.ground, []),
            state: new forms_1.FormControl(this.team.state, []),
            city: new forms_1.FormControl(this.team.city, []),
            address: new forms_1.FormControl(this.team.address, [])
        });
    };
    AddEditTeamComponent.prototype.submitForm = function () {
        var _this = this;
        this.submitted = true;
        this.teamService.create(this.team).subscribe(function (data) { return _this.handleResponse(data); }, function (error) { return _this.handleError(error); });
    };
    AddEditTeamComponent.prototype.submitFormUpdate = function () {
        var _this = this;
        this.submitted = true;
        this.teamService.update(this.team).subscribe(function (data) { return _this.handleResponse(data); }, function (error) { return _this.handleError(error); });
    };
    AddEditTeamComponent.prototype.handleResponse = function (data) {
        if (data.status == true) {
            this.responseMessage.success(data.message, { nzDuration: 2000 });
            this.router.navigateByUrl('/team/manage');
        }
        else {
            this.responseMessage.error(data.message, { nzDuration: 2000 });
        }
    };
    AddEditTeamComponent.prototype.handleError = function (error) {
        this.server_message = error.error.message.errors;
    };
    AddEditTeamComponent = __decorate([
        core_1.Component({
            selector: 'app-add-edit-team',
            templateUrl: './add-edit-team.component.html'
        })
    ], AddEditTeamComponent);
    return AddEditTeamComponent;
}());
exports.AddEditTeamComponent = AddEditTeamComponent;
