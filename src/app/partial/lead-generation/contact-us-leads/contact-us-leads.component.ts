import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ToastrService } from 'ngx-toastr';

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
  contactDetailModelData:any;
  HighlightRow:any;
  deletecontctUsId:any;

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private errorSerivce: ErrorsService,
    private toastrService: ToastrService,
    private localStorage: LocalstorageService,
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

  showContactDetailModel(obj: any) {
    this.HighlightRow = obj.id;
    this.contactDetailModelData = obj;
  }

  deleteConformation(id: any) {
    this.HighlightRow = id;
    this.deletecontctUsId = id;
  }

  deleteContactUs() {
    let obj = {
      "id": parseInt(this.deletecontctUsId),
      "modifiedBy": this.localStorage.userId(),
      "modifiedDate": new Date()
    }
    this.apiService.setHttp('DELETE', "ContactUs", false, JSON.stringify(obj), false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.toastrService.success(res.statusMessage);
          this.getAllContactUs();
        } else {
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }
  
}
