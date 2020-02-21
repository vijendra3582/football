import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'football';
  showAdmin: boolean = false;

  constructor(private renderer: Renderer2 , private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log(event);
        if (event['url'] == '/' || event['url'] == '/login' || event['url'] == '/forget') {
          this.showAdmin = false;
        } else {
          this.showAdmin = true;
        }
      }
    });
  }
}
