import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidateNumber } from 'src/app/validations/custom.validators';
import { OrgnizationService } from 'src/app/services/orgnization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ClubService } from 'src/app/services/club.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-add-edit-club',
  templateUrl: './add-edit-club.component.html'
})
export class AddEditClubComponent implements OnInit {

  form: FormGroup;
  club: any = {};
  countries: any = [];
  states: any = [];
  orgnizations: any = [];
  cities: any = [];
  country = 101;
  submitted = false;
  server_message: any = {};
  _id = undefined;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private orgnizationService: OrgnizationService,
    private clubService: ClubService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private responseMessage: NzMessageService
  ) { }

  ngOnInit(): void {
    this._id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getState();
    this.getOrgnizations();
    this.setValue();
    if (this._id) {
      this.getclub(this._id);
      this.setFormEdit();
    } else {
      this.setValue();
      this.setForm();
    }
  }

  getState() {
    let country_id = this.country;
    if (!country_id) {
      return;
    }
    this.locationService.getState(country_id).subscribe(result => {
      this.states = result.data;
    });
  }

  getCity() {
    let state_id = this.club.state.id;
    if (!state_id) {
      return;
    }
    this.locationService.getCity(state_id).subscribe(result => {
      this.cities = result.data;
    });
  }

  setStateData() {
    var state_id = this.club.state.id;
    var state = this.states.find(function (el) {
      return el.id == state_id;
    });

    if (state) {
      this.club.state.name = state.name;
    }
  }

  setCityData() {
    var city_id = this.club.city.id;
    var city = this.cities.find(function (el) {
      return el.id == city_id;
    });

    if (city) {
      this.club.city.name = city.name;
    }
  }

  getOrgnizations() {
    this.orgnizationService.index().subscribe(
      data => {
        this.orgnizations = data.data;
      });
  }

  getclub(_id) {
    this.clubService.get(_id).subscribe(
      data => {
        this.club = data.data[0];
        this.club.orgnizationId = data.data[0].orgnizationId[0];
      });
  }

  setValue() {
    this.club = {};
    this.club.name = '';
    this.club.ownerName = '';
    this.club.email = '';
    this.club.phoneNumber = '';
    this.club.password = '';
    this.club.secondaryPhoneNumber = '';
    this.club.stadiumName = '';
    this.club.orgnizationId = '';
    this.club.state = { "id": 0, "name": "" };
    this.club.city = { "id": 0, "name": "" };
    this.club.address = '';
  }

  setForm() {
    this.form = this.fb.group({
      name: new FormControl(this.club.name, [Validators.required]),
      ownerName: new FormControl(this.club.ownerName, []),
      email: new FormControl(this.club.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.club.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      secondaryPhoneNumber: new FormControl(this.club.secondaryPhoneNumber, [Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      password: new FormControl(this.club.password, [Validators.required, Validators.minLength(8), Validators.maxLength(40)]),
      stadiumName: new FormControl(this.club.stadiumName, []),
      orgnizationId: new FormControl(this.club.orgnizationId, [Validators.required]),
      state: new FormControl(this.club.state, []),
      city: new FormControl(this.club.city, []),
      address: new FormControl(this.club.address, []),
    });
  }

  setFormEdit() {
    this.form = this.fb.group({
      name: new FormControl(this.club.name, [Validators.required]),
      ownerName: new FormControl(this.club.ownerName, []),
      email: new FormControl(this.club.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.club.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      secondaryPhoneNumber: new FormControl(this.club.secondaryPhoneNumber, [Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      password: new FormControl(null),
      stadiumName: new FormControl(this.club.stadiumName, []),
      orgnizationId: new FormControl(this.club.orgnizationId, [Validators.required]),
      state: new FormControl(this.club.state, []),
      city: new FormControl(this.club.city, []),
      address: new FormControl(this.club.address, []),
    });
  }

  submitForm() {
    this.submitted = true;
    this.clubService.create(this.club).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  submitFormUpdate() {
    this.submitted = true;
    this.clubService.update(this.club).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    if (data.status == true) {
      this.responseMessage.success(data.message, { nzDuration: 2000 });
      this.router.navigateByUrl('/club/manage');
    } else {
      this.responseMessage.error(data.message, { nzDuration: 2000 });
    }
  }

  handleError(error) {
    this.server_message = error.error.message.errors;
  }

}
