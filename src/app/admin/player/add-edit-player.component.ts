import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidateNumber } from 'src/app/validations/custom.validators';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { PlayerService } from 'src/app/services/player.service';
import { LocationService } from 'src/app/services/location.service';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-add-edit-player',
  templateUrl: './add-edit-player.component.html'
})

export class AddEditPlayerComponent implements OnInit {

  form: FormGroup;
  player: any = {};
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
    private playerService: PlayerService,
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
      this.getplayer(this._id);
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
    let state_id = this.player.state.id;
    if (!state_id) {
      return;
    }
    this.locationService.getCity(state_id).subscribe(result => {
      this.cities = result.data;
    });
  }

  setStateData() {
    var state_id = this.player.state.id;
    var state = this.states.find(function (el) {
      return el.id == state_id;
    });

    if (state) {
      this.player.state.name = state.name;
    }
  }

  setCityData() {
    var city_id = this.player.city.id;
    var city = this.cities.find(function (el) {
      return el.id == city_id;
    });

    if (city) {
      this.player.city.name = city.name;
    }
  }

  getClubs() {
    this.clubService.index().subscribe(
      data => {
        this.clubs = data.data;
      });
  }

  setOrgnization(){
    var club_id = this.player.clubId;
    var club = this.clubs.find(function (el) {
      return el._id == club_id;
    });

    if (club) {
      this.player.orgnizationId = club._id;
    }
  }

  getplayer(_id) {
    this.playerService.get(_id).subscribe(
      data => {
        this.player = data.data[0];
        this.player.clubId = data.data[0].clubId[0];
      });
  }

  setValue() {
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
  }

  setForm() {
    this.form = this.fb.group({
      name: new FormControl(this.player.name, [Validators.required]),
      ownerName: new FormControl(this.player.ownerName, []),
      headCoachName: new FormControl(this.player.headCoachName, []),
      email: new FormControl(this.player.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.player.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      ownerPhoneNumber: new FormControl(this.player.ownerPhoneNumber, [Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      password: new FormControl(this.player.password, [Validators.required, Validators.minLength(8), Validators.maxLength(40)]),
      numberOfPlayer: new FormControl(this.player.numberOfPlayer, [ValidateNumber]),
      // orgnizationId: new FormControl(this.player.orgnizationId, [Validators.required]),
      clubId: new FormControl(this.player.clubId, [Validators.required]),
      ground: new FormControl(this.player.ground, []),
      state: new FormControl(this.player.state, []),
      city: new FormControl(this.player.city, []),
      address: new FormControl(this.player.address, []),
    });
  }

  setFormEdit() {
    this.form = this.fb.group({
      name: new FormControl(this.player.name, [Validators.required]),
      ownerName: new FormControl(this.player.ownerName, []),
      headCoachName: new FormControl(this.player.headCoachName, []),
      email: new FormControl(this.player.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.player.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      ownerPhoneNumber: new FormControl(this.player.ownerPhoneNumber, [Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      password: new FormControl(null),
      numberOfPlayer: new FormControl(this.player.numberOfPlayer, [ValidateNumber]),
      // orgnizationId: new FormControl(this.player.orgnizationId, [Validators.required]),
      clubId: new FormControl(this.player.clubId, [Validators.required]),
      ground: new FormControl(this.player.ground, []),
      state: new FormControl(this.player.state, []),
      city: new FormControl(this.player.city, []),
      address: new FormControl(this.player.address, []),
    });
  }

  submitForm() {
    this.submitted = true;
    this.playerService.create(this.player).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  submitFormUpdate() {
    this.submitted = true;
    this.playerService.update(this.player).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    if (data.status == true) {
      this.responseMessage.success(data.message, { nzDuration: 2000 });
      this.router.navigateByUrl('/player/manage');
    } else {
      this.responseMessage.error(data.message, { nzDuration: 2000 });
    }
  }

  handleError(error) {
    this.server_message = error.error.message.errors;
  }

}
