import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-page-masters',
  templateUrl: './page-masters.component.html',
  styleUrls: ['./page-masters.component.css']
})
export class PageMastersComponent implements OnInit {

  editorConfig = this.commonService.editorConfig;

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
  }

}
