import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';


@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})

export class PostJobComponent implements OnInit {
  
  public items: string[] = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
  'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
  'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
  'Düsseldorf', 'Essen', 'Frankfurt'];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    toolbarHiddenButtons: [
      ['bold', 'fontName', 'heading', 'fontSize','subscript','superscript','justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'indent',
      'outdent','heading',
      'fontName','customClasses',
      'link',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule','textColor',
      'backgroundColor',]
    ],
  };

  PostJobForm! :FormGroup | any ;
  jobPostArray:any;

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce:ErrorsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(){
    this.defaultForm();
    this.getJobPost();
  }

  get f() { return this.PostJobForm.controls }

  defaultForm() {
    this.PostJobForm = this.fb.group({
      jobTitle: [''],
      jobDescription: [''],
      jobCategory: [''],
      jobLocation: [''],
      jobPostDate: [''],
      jobPostEndDate: [''],
      experienceFromYr: [0],
      experienceToYr: [0],
      role_Responsbility: [''],
      joiningPeriod: [''],
      employmentType: [''],
    })
  }

  clearForm(){
    this.defaultForm();
  }

  getJobPost() {
    this.apiService.setHttp('get', "JobPost/GetById?Id=1", false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.jobPostArray = res.responseData;
           this.toastrService.success(res.statusMessage);
        } else {
          this.jobPostArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
       error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  onSubmit() {
    if (this.PostJobForm.invalid) {
      return;
    } else {

      let obj = {
        "createdBy": 0,
        "modifiedBy": 0,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": true,
        "id": 0,
        "jobTitle": "string",
        "jobDescription": "string",
        "jobCategory": "string",
        "jobLocation": "string",
        "jobPostDate": "2022-05-16T10:10:35.589Z",
        "jobPostEndDate": "2022-05-16T10:10:35.589Z",
        "experienceFromYr": 0,
        "experienceToYr": 0,
        "qualificationId": 0,
        "role_Responsbility": "string",
        "joiningPeriod": "string",
        "employmentType": "string",
        "isActive": true,
        "skillModels": [
          {
            "createdBy": 0,
            "modifiedBy": 0,
            "createdDate": new Date(),
            "modifiedDate": new Date(),
            "isDeleted": true,
            "id": 0,
            "skillName": "string",
            "jobPostId": 0
          }
        ]
      }

      this.apiService.setHttp('POST', 'JobPost/AddJobPost', false, JSON.stringify(obj), false, 'stplUrl');
      this.apiService.getHttp().subscribe((res: any) => {
        if (res.statusCode == "200") {
          this.toastrService.success(res.statusMessage);
          this.defaultForm();
        } else {
          this.toastrService.error(res.statusMessage);
        }
      }, (error: any) => {
        this.errorSerivce.handelError(error.status);
      });
      this.clearForm();
    }
  }

}
