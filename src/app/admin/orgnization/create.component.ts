import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { OrgnizationService } from 'src/app/services/orgnization.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidateNumber } from 'src/app/validations/custom.validators';

@Component({
  selector: 'app-orgnization-create',
  templateUrl: './create.component.html'
})
export class OrgnizationCreateComponent implements OnInit {

  form: FormGroup;
  orgnization: any = {};
  countries: any = [];
  states: any = [];
  cities: any = [];
  country = 101;
  submitted = false;
  server_message: any = {};
  _id = undefined;

  constructor(
    private fb: FormBuilder,
    private orgnizationService: OrgnizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private responseMessage: NzMessageService
  ) { }

  ngOnInit(): void {
    this._id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this._id) {
      this.getorgnization(this._id);
      this.setFormEdit();
    } else {
      this.setValue();
      this.setForm();
    }
  }

  getorgnization(_id) {
    this.orgnizationService.get(_id).subscribe(
      data => {
        this.orgnization = data.data[0];
      });
  }

  setValue() {
    this.orgnization = {};
    this.orgnization.name = '';
    this.orgnization.email = '';
    this.orgnization.phoneNumber = '';
    this.orgnization.password = '';
  }

  setForm() {
    this.form = this.fb.group({
      name: new FormControl(this.orgnization.name, [Validators.required]),
      email: new FormControl(this.orgnization.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.orgnization.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      password: new FormControl(this.orgnization.password, [Validators.required, Validators.minLength(8), Validators.maxLength(40)]),
    });
  }

  setFormEdit() {
    this.form = this.fb.group({
      name: new FormControl(this.orgnization.name, [Validators.required]),
      email: new FormControl(this.orgnization.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.orgnization.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidateNumber]),
      password: new FormControl(null),
    });
  }

  submitForm() {
    this.submitted = true;
    this.orgnizationService.create(this.orgnization).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  submitFormUpdate() {
    this.submitted = true;
    this.orgnizationService.update(this.orgnization).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    if (data.status == true) {
      this.responseMessage.success(data.message, { nzDuration: 2000 });
      this.router.navigateByUrl('/orgnization/manage');
    } else {
      this.responseMessage.error(data.message, { nzDuration: 2000 });
    }
  }

  handleError(error) {
    this.server_message = error.error.message.errors;
  }
}
