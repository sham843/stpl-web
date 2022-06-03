import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  projectId:any;
  pageMasterArray:any;

  constructor(
     private route:ActivatedRoute,
     private commonService: CommonService,
     public apiService: ApiService,
     private toastrService: ToastrService,
     private errorSerivce: ErrorsService,
     ) { this.projectId = this.route.snapshot.params['id'];}

  ngOnInit(): void {
    this.getPageMaster();
  }

  getPageMaster() {
    this.apiService.setHttp('get', "PageMaster/GetById?Id=" + this.projectId, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.pageMasterArray = res.responseData;
        } else {
          this.pageMasterArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

}
