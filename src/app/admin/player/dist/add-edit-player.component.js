"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddEditPlayerComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var custom_validators_1 = require("src/app/validations/custom.validators");
var AddEditPlayerComponent = /** @class */ (function () {
    function AddEditPlayerComponent(fb, locationService, clubService, playerService, router, activatedRoute, responseMessage) {
        this.fb = fb;
        this.locationService = locationService;
        this.clubService = clubService;
        this.playerService = playerService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.responseMessage = responseMessage;
        this.player = {};
        this.countries = [];
        this.states = [];
        this.clubs = [];
        this.cities = [];
        this.country = 101;
        this.submitted = false;
        this.server_message = {};
        this._id = undefined;
    }
    AddEditPlayerComponent.prototype.ngOnInit = function () {
        this._id = this.activatedRoute.snapshot.paramMap.get('id');
        this.getState();
        this.getClubs();
        this.setValue();
        if (this._id) {
            this.getplayer(this._id);
            this.setFormEdit();
        }
        else {
            this.setValue();
            this.setForm();
        }
    };
    AddEditPlayerComponent.prototype.getState = function () {
        var _this = this;
        var country_id = this.country;
        if (!country_id) {
            return;
        }
        this.locationService.getState(country_id).subscribe(function (result) {
            _this.states = result.data;
        });
    };
    AddEditPlayerComponent.prototype.getCity = function () {
        var _this = this;
        var state_id = this.player.state.id;
        if (!state_id) {
            return;
        }
        this.locationService.getCity(state_id).subscribe(function (result) {
            _this.cities = result.data;
        });
    };
    AddEditPlayerComponent.prototype.setStateData = function () {
        var state_id = this.player.state.id;
        var state = this.states.find(function (el) {
            return el.id == state_id;
        });
        if (state) {
            this.player.state.name = state.name;
        }
    };
    AddEditPlayerComponent.prototype.setCityData = function () {
        var city_id = this.player.city.id;
        var city = this.cities.find(function (el) {
            return el.id == city_id;
        });
        if (city) {
            this.player.city.name = city.name;
        }
    };
    AddEditPlayerComponent.prototype.getClubs = function () {
        var _this = this;
        this.clubService.index().subscribe(function (data) {
            _this.clubs = data.data;
        });
    };
    AddEditPlayerComponent.prototype.setOrgnization = function () {
        var club_id = this.player.clubId;
        var club = this.clubs.find(function (el) {
            return el._id == club_id;
        });
        if (club) {
            this.player.orgnizationId = club._id;
        }
    };
    AddEditPlayerComponent.prototype.getplayer = function (_id) {
        var _this = this;
        this.playerService.get(_id).subscribe(function (data) {
            _this.player = data.data[0];
            _this.player.clubId = data.data[0].clubId[0];
        });
    };
    AddEditPlayerComponent.prototype.setValue = function () {
        this.player = {};
        this.player.name = '';
        this.player.ownerName = '';
        this.player.headCoachName = '';
        this.player.email = '';
        this.player.phoneNumber = '';
        this.player.password = '';
        this.player.ownerPhoneNumber = '';
        this.player.numberOfPlayer = '';
        this.player.orgnizationId = '';
        this.player.clubId = '';
        this.player.ground = '';
        this.player.state = { "id": 0, "name": "" };
        this.player.city = { "id": 0, "name": "" };
        this.player.address = '';
    };
    AddEditPlayerComponent.prototype.setForm = function () {
        this.form = this.fb.group({
            name: new forms_1.FormControl(this.player.name, [forms_1.Validators.required]),
            ownerName: new forms_1.FormControl(this.player.ownerName, []),
            headCoachName: new forms_1.FormControl(this.player.headCoachName, []),
            email: new forms_1.FormControl(this.player.email, [forms_1.Validators.required, forms_1.Validators.email]),
            phoneNumber: new forms_1.FormControl(this.player.phoneNumber, [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10), custom_validators_1.ValidateNumber]),
            ownerPhoneNumber: new forms_1.FormControl(this.player.ownerPhoneNumber, [forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10), custom_validators_1.ValidateNumber]),
            password: new forms_1.FormControl(this.player.password, [forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(40)]),
            numberOfPlayer: new forms_1.FormControl(this.player.numberOfPlayer, [custom_validators_1.ValidateNumber]),
            // orgnizationId: new FormControl(this.player.orgnizationId, [Validators.required]),
            clubId: new forms_1.FormControl(this.player.clubId, [forms_1.Validators.required]),
            ground: new forms_1.FormControl(this.player.ground, []),
            state: new forms_1.FormControl(this.player.state, []),
            city: new forms_1.FormControl(this.player.city, []),
            address: new forms_1.FormControl(this.player.address, [])
        });
    };
    AddEditPlayerComponent.prototype.setFormEdit = function () {
        this.form = this.fb.group({
            name: new forms_1.FormControl(this.player.name, [forms_1.Validators.required]),
            ownerName: new forms_1.FormControl(this.player.ownerName, []),
            headCoachName: new forms_1.FormControl(this.player.headCoachName, []),
            email: new forms_1.FormControl(this.player.email, [forms_1.Validators.required, forms_1.Validators.email]),
            phoneNumber: new forms_1.FormControl(this.player.phoneNumber, [forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10), custom_validators_1.ValidateNumber]),
            ownerPhoneNumber: new forms_1.FormControl(this.player.ownerPhoneNumber, [forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10), custom_validators_1.ValidateNumber]),
            password: new forms_1.FormControl(null),
            numberOfPlayer: new forms_1.FormControl(this.player.numberOfPlayer, [custom_validators_1.ValidateNumber]),
            // orgnizationId: new FormControl(this.player.orgnizationId, [Validators.required]),
            clubId: new forms_1.FormControl(this.player.clubId, [forms_1.Validators.required]),
            ground: new forms_1.FormControl(this.player.ground, []),
            state: new forms_1.FormControl(this.player.state, []),
            city: new forms_1.FormControl(this.player.city, []),
            address: new forms_1.FormControl(this.player.address, [])
        });
    };
    AddEditPlayerComponent.prototype.submitForm = function () {
        var _this = this;
        this.submitted = true;
        this.playerService.create(this.player).subscribe(function (data) { return _this.handleResponse(data); }, function (error) { return _this.handleError(error); });
    };
    AddEditPlayerComponent.prototype.submitFormUpdate = function () {
        var _this = this;
        this.submitted = true;
        this.playerService.update(this.player).subscribe(function (data) { return _this.handleResponse(data); }, function (error) { return _this.handleError(error); });
    };
    AddEditPlayerComponent.prototype.handleResponse = function (data) {
        if (data.status == true) {
            this.responseMessage.success(data.message, { nzDuration: 2000 });
            this.router.navigateByUrl('/player/manage');
        }
        else {
            this.responseMessage.error(data.message, { nzDuration: 2000 });
        }
    };
    AddEditPlayerComponent.prototype.handleError = function (error) {
        this.server_message = error.error.message.errors;
    };
    AddEditPlayerComponent = __decorate([
        core_1.Component({
            selector: 'app-add-edit-player',
            templateUrl: './add-edit-player.component.html'
        })
    ], AddEditPlayerComponent);
    return AddEditPlayerComponent;
}());
exports.AddEditPlayerComponent = AddEditPlayerComponent;
