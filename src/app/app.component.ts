import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'eAuction';
  visible: boolean | undefined;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => { //beefore page load spinner is show
      if (event instanceof NavigationEnd) {
        window.scroll(0, 0);
      }
    });
  }
}
