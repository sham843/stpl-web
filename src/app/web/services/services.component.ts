import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  pageMasterArray: any;
  pageCategoryArray: any;
  hideDiv: boolean = false;

  constructor(
    private router:Router,
     private route:ActivatedRoute,
     private commonService: CommonService,
     public apiService: ApiService,
     private toastrService: ToastrService,
     private errorSerivce: ErrorsService,
     ) { }

  ngOnInit(): void {
    this.getPageCategoryId();
  }

  getPageCategoryId() {
    this.apiService.setHttp('get', "dashboard/GetByPageCategoryId?PageCategoryId=" + 2, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.pageCategoryArray = res.responseData;
        } else {
          this.pageCategoryArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  getPageMaster(id:any) {
    this.apiService.setHttp('get', "PageMaster/GetById?Id=" + id, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.pageMasterArray = res.responseData;
          this.hideDiv = true;
        } else {
          this.pageMasterArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  redirToProj(flag:any,id:any){
    let url = this.router.url.split('/');
    if(url.length == 3){
      this.router.navigate(['../'+flag], {relativeTo:this.route});
    }else{
      this.router.navigate([flag], {relativeTo:this.route});
    }
    this.getPageMaster(id);
  }

}
