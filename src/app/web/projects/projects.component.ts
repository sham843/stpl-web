import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { titleCase } from "title-case";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  pageCategoryArray: any;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
  ) { }

  ngOnInit(): void {
    this.getPageCategoryId();
  }

  getPageCategoryId() {
    this.apiService.setHttp('get', "dashboard/GetByPageCategoryId?PageCategoryId=" + 3, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.pageCategoryArray = res.responseData;
          this.pageCategoryArray.map((ele: any) => {
            let splitData = ele.pageName.toLowerCase();
            ele.pageName = titleCase(splitData);
          })
        } else {
          this.pageCategoryArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  navigatePage(id: any) {
    this.commonService.routerLinkRedirect('projects/project-details/' + id);
  }

}
