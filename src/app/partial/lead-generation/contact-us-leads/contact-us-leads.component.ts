import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact-us-leads',
  templateUrl: './contact-us-leads.component.html',
  styleUrls: ['./contact-us-leads.component.css']
})
export class ContactUsLeadsComponent implements OnInit {

  contactUsArray: any;
  totalRows: any;
  pageNumber: number = 1;
  pagesize: number = 10;

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private errorSerivce: ErrorsService,
    private spinner: NgxSpinnerService,)
   { }

   ngOnInit(): void {
    this.getAllContactUs();
  }

  getAllContactUs() {
    this.spinner.show();
    let obj = 'pageno=' + this.pageNumber + '&pagesize=' + this.pagesize ;
    this.apiService.setHttp('get', "ContactUs/GetAll?" + obj, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.contactUsArray = res.responseData.responseData1;
          this.totalRows = res.responseData.responseData2.totalPages * this.pagesize;
          this.spinner.hide();
        } else {
          this.contactUsArray = [];
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
    this.getAllContactUs();
  }
  
}
