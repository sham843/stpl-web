import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
  }

  navigatePage(jobPost:any){
     this.commonService.routerLinkRedirect('../job-details/' + jobPost);
  }

}
