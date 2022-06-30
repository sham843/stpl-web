import { Component, OnInit } from '@angular/core';
import { InitDetail } from 'lightgallery/lg-events';
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
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
allImageDataArray:any[]=[];
pageNumber: number = 1;
pagesize: number = 999;
onInit = (detail: InitDetail): void => {
  this.lightGallery = detail.instance;
};

constructor(private commonService: CommonService,
  public apiService: ApiService,
  private errorSerivce: ErrorsService,
  private toastrService: ToastrService,) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(){
    let obj = 'pageno=' + this.pageNumber + '&pagesize=' + this.pagesize
    this.apiService.setHttp('get', "GallaryMaster/GetAll?"+obj, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.statusCode === "200") {
          this.allImageDataArray = res.responseData.responseData1;
          res.responseData.responseData1.map((x:any)=>{
            x.gallaryMasters.map((xx:any)=>{
              xx.imagePath=xx.imagePath.concat('?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80');
              xx.imagePathSm=xx.imagePath.concat('?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80');
            })
          })
          console.log(this.allImageDataArray)
        } else {
          this.allImageDataArray = [];
          // this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

}
