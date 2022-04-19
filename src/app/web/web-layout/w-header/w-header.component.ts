import { Component, OnInit, HostListener  } from '@angular/core';

@Component({
  selector: 'app-w-header',
  templateUrl: './w-header.component.html',
  styleUrls: ['./w-header.component.scss']
})
export class WHeaderComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
      let element = document.querySelector('.navbar') as HTMLElement;
      if (window.pageYOffset > element.clientHeight) {
        element.classList.add('navbar-scroll');
      } else {
        element.classList.remove('navbar-scroll');
      }
    }
  constructor() { }

  ngOnInit(): void {
  }

}
