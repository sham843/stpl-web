import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-request-demo-leads',
  templateUrl: './request-demo-leads.component.html',
  styleUrls: ['./request-demo-leads.component.css']
})
export class RequestDemoLeadsComponent implements OnInit {

  requestDemoArray: any;
  totalRows: any;
  pageNumber: number = 1;
  pagesize: number = 10;
  leadTypeArray = [{ id: 3, name: 'All' }, { id: 1, name: 'Request a Demo Leads' }, { id: 2, name: 'Connect With Us Leads' }]
  leadType = new FormControl('');

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private errorSerivce: ErrorsService,
    private spinner: NgxSpinnerService,)
   { }

   ngOnInit(): void {
    this.getAllRequestDemo();
  }

  getAllRequestDemo() {
    this.spinner.show();
    let isRequest = this.leadType.value == '' ? 3 : this.leadType.value;
    let obj = 'pageno=' + this.pageNumber + '&pagesize=' + this.pagesize + '&textSearch=' + '' +'&IsRequest=' + isRequest;
    this.apiService.setHttp('get', "RequestDemo/GetAll?" + obj, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.requestDemoArray = res.responseData.responseData1;
          this.totalRows = res.responseData.responseData2.totalPages * this.pagesize;
          this.spinner.hide();
        } else {
          this.requestDemoArray = [];
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
    this.getAllRequestDemo();
  }

  clearFilter() {
    this.leadType.setValue('');
    this.pageNumber = 1;
    this.getAllRequestDemo();
  }

}
