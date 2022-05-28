import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-approved-rejected-applications',
  templateUrl: './approved-rejected-applications.component.html',
  styleUrls: ['./approved-rejected-applications.component.css']
})
export class ApprovedRejectedApplicationsComponent implements OnInit {


  AppliedMemberArray:any;
  totalRows: any;
  pageNumber: number = 1;
  pagesize: number = 10;
  subject: Subject<any> = new Subject();
  searchText = new FormControl('');

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private spinner: NgxSpinnerService,
    private localStorage:LocalstorageService,) { }

  ngOnInit(): void {
    this.getAppliedMember();
    this.searchFilters('false');
  }

  getAppliedMember() {
    this.spinner.show();
    let obj = 'pageno=' + this.pageNumber +'&pagesize=' + this.pagesize +'&textSearch=' + this.searchText.value ;
    this.apiService.setHttp('get', "member/AppliedMember/GetAll?" + obj, false, false, false, 'stplweb');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.AppliedMemberArray = res.responseData.responseData1;
          this.totalRows = res.responseData.responseData2.totalPages * this.pagesize;
          this.spinner.hide();
        } else {
          this.AppliedMemberArray = [];
          this.spinner.hide();
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : '';
          // this.toastrService.error(res.statusMessage)
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status),this.spinner.hide(); })
    });
  }

  onClickPagintion(pageNo: any) {
    this.pageNumber = pageNo;
    this.getAppliedMember();
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
        this.getAppliedMember();
      });
  }

  clearFilter() {
      this.searchText.setValue('');
      this.getAppliedMember();
    }

}
