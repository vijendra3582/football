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

  loginForm: FormGroup;
  submitted = false;
  server_message: any = {};
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      remember: new FormControl(null)
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
  }

  handleResponse(data) {
    this.tokenService.setUserInfo(data);
    this.loginForm.reset();
    this.router.navigateByUrl('/dashboard');
  }

  handleError(err) {
    console.log(err.error.message);
    if (err.status === 422)
      this.server_message.email = { "message": err.error.message.errors.email.message };
    else
      this.server_message.email = { "message": err.error.message };
    console.log(this.server_message);
  }
}
