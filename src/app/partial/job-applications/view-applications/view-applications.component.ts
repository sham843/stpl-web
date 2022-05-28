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
  
  viewApplicationArray:any;
  totalRows: any;
  pageNumber: number = 1;
  pagesize: number = 10;
  subject: Subject<any> = new Subject();
  searchText = new FormControl('');
  items:any;

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.getViewApplication();
    this.searchFilters('false');
  }

  getViewApplication() {
    this.spinner.show();
    let obj = 'pageno=' + this.pageNumber +'&pagesize=' + this.pagesize +'&textSearch=' + this.searchText.value ;
    this.apiService.setHttp('get', "member/AppliedMember/ViewApplication?" + obj, false, false, false, 'stplweb');
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
      error: ((error: any) => { this.errorSerivce.handelError(error.status),this.spinner.hide(); })
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

  clearFilter() {
      this.searchText.setValue('');
      this.getViewApplication();
    }

}
