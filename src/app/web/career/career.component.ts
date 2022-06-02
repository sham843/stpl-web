import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  activeJobPostArray:any;
  totalRows: any;
  pageNumber: number = 1;
  pagesize: number = 10;

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private spinner:NgxSpinnerService,
    private fileUploadService:FileUploadService,
  ) { }

  ngOnInit(): void {
    this.getAllActiveJobPost();
  }

  navigatePage(jobPost:any){
     this.commonService.routerLinkRedirect('../job-details/' + jobPost);
  }

  getAllActiveJobPost() {
    this.spinner.show();
    let obj = 'pageno=' + this.pageNumber +'&pagesize=' + this.pagesize;
    this.apiService.setHttp('get', "JobPost/GetAllActiveJobPost?" + 'Id=' + obj, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.spinner.hide();
          this.activeJobPostArray = res.responseData.responseData1;
          this.totalRows = res.responseData.responseData2.totalPages * this.pagesize;
        } else {
          this.spinner.hide();
          this.activeJobPostArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status),this.spinner.hide(); })
    });
  }

  onClickPagintion(pageNo: any) {
    this.pageNumber = pageNo;
    this.getAllActiveJobPost();
  }

}
