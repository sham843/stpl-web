import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})
export class ViewApplicationsComponent implements OnInit {

  viewApplicationArray: any;
  totalRows: any;
  pageNumber: number = 1;
  pagesize: number = 10;
  subject: Subject<any> = new Subject();
  searchText = new FormControl('');
  jobTitleDrop = new FormControl('');
  items: any;
  allJobTitleArray: any;

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.getViewApplication();
    this.getAllJobTitle();
    this.searchFilters('false');
  }

  getAllJobTitle() {
    this.apiService.setHttp('get', "Master/GetAllJobTitles", false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.allJobTitleArray = res.responseData;
        } else {
          this.allJobTitleArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  getViewApplication() {
    this.spinner.show();
    let obj = 'pageno=' + this.pageNumber + '&pagesize=' + this.pagesize + '&textSearch=' + this.searchText.value
      + '&JobTitle=' + this.jobTitleDrop.value;
    this.apiService.setHttp('get', "AppliedMember/ViewApplication?" + obj, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.viewApplicationArray = res.responseData.responseData1;
          this.totalRows = res.responseData.responseData2.totalPages * this.pagesize;
          this.spinner.hide();
        } else {
          this.viewApplicationArray = [];
          this.spinner.hide();
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : '';
          // this.toastrService.error(res.statusMessage)
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status), this.spinner.hide(); })
    });
  }

  onClickPagintion(pageNo: any) {
    this.pageNumber = pageNo;
    this.getViewApplication();
  }

  onKeyUpFilter() {
    this.subject.next();
  }

  searchFilters(flag: any) {
    this.subject
      .pipe(debounceTime(700))
      .subscribe(() => {
        this.searchText.value;
        this.pageNumber = 1;
        this.getViewApplication();
      });
  }

  clearFilter(flag: any) {
    if (flag == 'search') {
      this.searchText.setValue('');
    } else {
      this.jobTitleDrop.setValue('');
    }
    this.pageNumber = 1;
    this.getViewApplication();
  }

  updateActiveApplication(ObjData: any, flag: any) {
    let obj = {
      "id": ObjData.id,
      "isApproved": flag
    }
    this.apiService.setHttp('PUT', "AppliedMember/UpdateApprovedStatus", false, JSON.stringify(obj), false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.toastrService.success(res.statusMessage);
          this.getViewApplication();
        } else {
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

}
