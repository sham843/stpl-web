import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.scss']
})
export class WebLayoutComponent implements OnInit {
  hideHeader: boolean = true;
  hideFooter: boolean = true;
  constructor(private router: Router) {
    if (this.router.url == '/discover-us') {
      this.hideHeader = false;
      this.hideFooter = false;
    }
   }

  ngOnInit(): void {
  }

}
