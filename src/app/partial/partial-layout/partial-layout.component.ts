import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partial-layout',
  templateUrl: './partial-layout.component.html',
  styleUrls: ['./partial-layout.component.scss']
})
export class PartialLayoutComponent implements OnInit {
  title = 'angular-pro-sidebar';
  constructor() { }
  

  ngOnInit(): void {
  }

}
