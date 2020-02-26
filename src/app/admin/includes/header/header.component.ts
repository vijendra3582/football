import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  menuNotification: boolean = false;
  menuEvent: boolean = false;
  menuMessage: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
  }

  resetMenu() {
    this.menuNotification = false;
    this.menuEvent = false;
    this.menuMessage = false;
  }

  showNotification() {
    if (this.menuNotification) {
      this.menuNotification = false;
    } else {
      this.resetMenu();
      this.menuNotification = true;
    }
  }

  showEvent() {
    if (this.menuEvent) {
      this.menuEvent = false;
    } else {
      this.resetMenu();
      this.menuEvent = true;
    }
  }

  showMessage() {
    if (this.menuMessage) {
      this.menuMessage = false;
    } else {
      this.resetMenu();
      this.menuMessage = true;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
