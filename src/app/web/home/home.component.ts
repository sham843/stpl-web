import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // var carouselA: any = document.getElementById('carouselExampleIndicators1')
    // var carouselB: any = document.getElementById('carouselExampleIndicators')

    // carouselA.addEventListener('slide.bs.carousel', function (e:any) {
    //   var bsCarouselB = bootstrap.Carousel.getInstance(carouselB)
    //   bsCarouselB.to(e.to)
    // })
  }

}
