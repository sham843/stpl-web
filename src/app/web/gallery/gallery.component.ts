import { Component, OnInit } from '@angular/core';
import { InitDetail } from 'lightgallery/lg-events';
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  settings = {
    thumbnail: false,
    counter: false,
    animateThumb: true,
    // allowMediaOverlap: false,
    plugins: [lgZoom,lgThumbnail],
};
lightGallery: any;



onInit = (detail: InitDetail): void => {
  this.lightGallery = detail.instance;
};

  constructor() { }

  ngOnInit(): void {
  }



}
