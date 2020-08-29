import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidateNumber } from 'src/app/validations/custom.validators';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { TeamService } from 'src/app/services/team.service';
import { LocationService } from 'src/app/services/location.service';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-add-edit-team',
  templateUrl: './add-edit-team.component.html'
})

export class AddEditTeamComponent implements OnInit {

  form: FormGroup;
  team: any = {};
  countries: any = [];
  states: any = [];
  clubs: any = [];
  cities: any = [];
  country = 101;
  submitted = false;
  server_message: any = {};
  _id = undefined;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private clubService: ClubService,
    private teamService: TeamService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private responseMessage: NzMessageService
  ) { }

  ngOnInit(): void {
    this._id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getState();
    this.getClubs()
    this.setValue();
    if (this._id) {
      this.getteam(this._id);
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
    let state_id = this.team.state.id;
    if (!state_id) {
      return;
    }
    this.locationService.getCity(state_id).subscribe(result => {
      this.cities = result.data;
    });
  }

  setStateData() {
    var state_id = this.team.state.id;
    var state = this.states.find(function (el) {
      return el.id == state_id;
    });

    if (state) {
      this.team.state.name = state.name;
    }
  }

  setCityData() {
    var city_id = this.team.city.id;
    var city = this.cities.find(function (el) {
      return el.id == city_id;
    });

    if (city) {
      this.team.city.name = city.name;
    }
  }

  getClubs() {
    this.clubService.index().subscribe(
      data => {
        this.clubs = data.data;
      });
  }

  setOrgnization(){
    var club_id = this.team.clubId;
    var club = this.clubs.find(function (el) {
      return el._id == club_id;
    });

    if (club) {
      this.team.orgnizationId = club._id;
    }
  }

  getteam(_id) {
    this.teamService.get(_id).subscribe(
      data => {
        this.team = data.data[0];
        this.team.clubId = data.data[0].clubId[0];
      });
  }

  setValue() {
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
  }

  setForm() {
    this.form = this.fb.group({
      name: new FormControl(this.team.name, [Validators.required]),
      ownerName: new FormControl(this.team.ownerName, []),
      headCoachName: new FormControl(this.team.headCoachName, []),
      email: new FormControl(this.team.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.team.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      ownerPhoneNumber: new FormControl(this.team.ownerPhoneNumber, [Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      password: new FormControl(this.team.password, [Validators.required, Validators.minLength(8), Validators.maxLength(40)]),
      numberOfPlayer: new FormControl(this.team.numberOfPlayer, [ValidateNumber]),
      // orgnizationId: new FormControl(this.team.orgnizationId, [Validators.required]),
      clubId: new FormControl(this.team.clubId, [Validators.required]),
      ground: new FormControl(this.team.ground, []),
      state: new FormControl(this.team.state, []),
      city: new FormControl(this.team.city, []),
      address: new FormControl(this.team.address, []),
    });
  }

  setFormEdit() {
    this.form = this.fb.group({
      name: new FormControl(this.team.name, [Validators.required]),
      ownerName: new FormControl(this.team.ownerName, []),
      headCoachName: new FormControl(this.team.headCoachName, []),
      email: new FormControl(this.team.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.team.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      ownerPhoneNumber: new FormControl(this.team.ownerPhoneNumber, [Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      password: new FormControl(null),
      numberOfPlayer: new FormControl(this.team.numberOfPlayer, [ValidateNumber]),
      // orgnizationId: new FormControl(this.team.orgnizationId, [Validators.required]),
      clubId: new FormControl(this.team.clubId, [Validators.required]),
      ground: new FormControl(this.team.ground, []),
      state: new FormControl(this.team.state, []),
      city: new FormControl(this.team.city, []),
      address: new FormControl(this.team.address, []),
    });
  }

  submitForm() {
    this.submitted = true;
    this.teamService.create(this.team).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  submitFormUpdate() {
    this.submitted = true;
    this.teamService.update(this.team).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    if (data.status == true) {
      this.responseMessage.success(data.message, { nzDuration: 2000 });
      this.router.navigateByUrl('/team/manage');
    } else {
      this.responseMessage.error(data.message, { nzDuration: 2000 });
    }
  }

  handleError(error) {
    this.server_message = error.error.message.errors;
  }

}
