import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Component({
  selector: 'app-subscribe-us-leads',
  templateUrl: './subscribe-us-leads.component.html',
  styleUrls: ['./subscribe-us-leads.component.css']
})
export class SubscribeUsLeadsComponent implements OnInit {

  subscriberArray: any;
  totalRows: any;
  pageNumber: number = 1;
  pagesize: number = 10;
  HighlightRow:any;
  deleteSubscribUsId:any;

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private errorSerivce: ErrorsService,
    private localStorage: LocalstorageService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,)
   { }

   ngOnInit(): void {
    this.getAllSubscriber();
  }

  getAllSubscriber() {
    this.spinner.show();
    let obj = 'pageno=' + this.pageNumber + '&pagesize=' + this.pagesize ;
    this.apiService.setHttp('get', "dashboard/GetAllSubscriber?" + obj, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.subscriberArray = res.responseData.responseData1;
          this.totalRows = res.responseData.responseData2.totalPages * this.pagesize;
          this.spinner.hide();
        } else {
          this.subscriberArray = [];
          this.spinner.hide();
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : '';
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status), this.spinner.hide(); })
    });
  }

  onClickPagintion(pageNo: any) {
    this.pageNumber = pageNo;
    this.getAllSubscriber();
  }

 //.................................. Unsubscribe Status Code Stare Here ......................................//

 updateActiveSubScription(ObjData: any, event: any) {
  let isSubscribe;
  event.target.checked == true ? isSubscribe = 1 : isSubscribe = 0;
  let obj = {
    "id": ObjData?.id,
    "isSubscribe": isSubscribe
  }
  this.apiService.setHttp('PUT', "dashboard/UpdatesubscribeStatus", false, JSON.stringify(obj), false, 'stplUrl');
  this.apiService.getHttp().subscribe({
    next: (res: any) => {
      if (res.statusCode === "200") {
        this.toastrService.success(res.statusMessage);
        this.getAllSubscriber();
      } else {
        this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
      }
    },
    error: ((error: any) => { this.errorSerivce.handelError(error.status) })
  });
}

//.................................. Unsubscribe Status Code End Here ......................................//

deleteConformation(id: any) {
  this.HighlightRow = id;
  this.deleteSubscribUsId = id;
}

deleteSubcribUs() {
  let obj = {
    "id": parseInt(this.deleteSubscribUsId),
    "modifiedBy": this.localStorage.userId(),
    "modifiedDate": new Date()
  }
  this.apiService.setHttp('DELETE', "dashboard/DeleteSubscriber", false, JSON.stringify(obj), false, 'stplUrl');
  this.apiService.getHttp().subscribe({
    next: (res: any) => {
      if (res.statusCode === "200") {
        this.toastrService.success(res.statusMessage);
        this.getAllSubscriber();
      } else {
        this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
      }
    },
    error: ((error: any) => { this.errorSerivce.handelError(error.status) })
  });
}

}
