import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { AcademyService } from 'src/app/services/academy.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-academy-create',
  templateUrl: './create.component.html'
})
export class AcademyCreateComponent implements OnInit {

  academyForm: FormGroup;
  academy: any = {};
  countries: any = [];
  states: any = [];
  cities: any = [];
  country = 101;
  submitted = false;
  server_message: any = {};
  id = undefined;
  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private academyService: AcademyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private responseMessage: NzMessageService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.getAcademy(this.id);
      this.setFormEdit();
    } else {
      this.setValues();
      this.setForm();
    }
    this.getCountry();

  }

  getCountry() {
    this.locationService.getCountry().subscribe(result => {
      this.countries = result;
      this.getState();
    });
  }

  getState() {
    let country_id = this.academy.country;
    if (!country_id) {
      return;
    }
    this.locationService.getState(country_id).subscribe(result => {
      this.states = result;
    });
  }

  getCity() {
    let state_id = this.academy.state;
    if (!state_id) {
      return;
    }
    this.locationService.getCity(state_id).subscribe(result => {
      this.cities = result;
    });
  }

  getAcademy(id) {
    this.academyService.single(id).subscribe(
      data => {
        this.academy = data.data;
      });
  }

  setValues() {
    this.academy.email = '';
    this.academy.password = '';
    this.academy.confirm_password = '';
    this.academy.name = '';
    this.academy.mobile = '';
    this.academy.address_1 = '';
    this.academy.address_2 = '';
    this.academy.country = 101;
    this.academy.state = '';
    this.academy.city = '';
  }

  setForm() {
    this.academyForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirm_password: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      address_1: [null, [Validators.required]],
      address_2: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
    });
  }

  setFormEdit() {
    this.academyForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      address_1: [null, [Validators.required]],
      address_2: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.submitted = true;
    this.academyService.insert(this.academy).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  submitFormUpdate() {
    this.submitted = true;
    this.academyService.update(this.academy).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    if (data.status == true) {
      this.responseMessage.success(data.message, { nzDuration: 2000 });
      this.router.navigateByUrl('/academy/manage');
    } else {
      this.responseMessage.error(data.message, { nzDuration: 2000 });
    }

  }

  handleError(error) {
    this.server_message = error.error.message.errors;
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.academyForm.controls.confirm_password.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.academyForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }
}
