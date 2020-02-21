import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  server_message = { email: '' };
  constructor(
    private authService: AuthService, 
    private tokenService: TokenService, 
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      remember: new FormControl(null)
    });
  }

  login() {
    this.submitted = true;
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
  }

  handleResponse(data) {
    this.tokenService.setUserInfo(data);
    this.form.reset();
    this.router.navigateByUrl('/dashboard');
  }

  handleError(err) {
    this.server_message.email = err.error.message;
  }
}
