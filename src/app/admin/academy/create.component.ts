import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-academy-create',
  templateUrl: './create.component.html'
})
export class AcademyCreateComponent implements OnInit {

  academyForm: FormGroup;

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.academyForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.academyForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.academyForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]],
      phoneNumberPrefix: ['+91'],
      mobile: [null, [Validators.required]],
      address_1: [null, [Validators.required]],
      address_2: [null, [Validators.required]],
    });
  }


  submitForm(){

  }
}
