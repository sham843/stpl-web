import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {


  JobPostId:any;
  jobPostGetByIdArray: any;
  submitted = false;

  applayJobForm!:FormGroup | any;
  @ViewChild('fileInput') fileInput!: ElementRef;
  resumePath:any;
  resumeSubmit:any;
  @ViewChild('jobDetailModel') jobDetailModel: any;  

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private fb: FormBuilder,
    private localStorage:LocalstorageService,
    private fileUploadService:FileUploadService,
    private route: ActivatedRoute,
    ) { this.JobPostId = this.route.snapshot.params['id'];}

  ngOnInit(): void {
    this.defaultApplayJobForm();
    this.jobPostGetById();
  }

  jobPostGetById() {
    this.apiService.setHttp('get', "JobPost/GetById?Id=" + this.JobPostId, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.jobPostGetByIdArray = res.responseData;
        } else {
          this.jobPostGetByIdArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  //........................ Applay Job Model Code Start Here........................//

  get f() { return this.applayJobForm.controls }

  defaultApplayJobForm() {
    this.applayJobForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+,|"\-\'\/\\]\\]{}][a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+,|"\-\'\/\\]\\]{}][a-zA-Z]+$')]],
      contactNo: ['',[Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      emailId: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    })
  }

  submitApplayJobForm() {
    let formData = this.applayJobForm.value;
    this.submitted = true;
    this.resumeSubmit = true;
    if (this.applayJobForm.invalid) {
      return;
    }else if (this.commonService.checkDataType(this.resumePath) == false) {
      return;
    } else {
      let fullName = formData.firstName.trim().concat(" ", formData.lastName.trim());
  
      let obj =  {
        "createdBy": this.localStorage.userId(),
        "modifiedBy": this.localStorage.userId(),
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": true,
        "id": 0,
        "jobTitle": this.jobPostGetByIdArray?.jobTitle,
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "fullName": fullName,
        "emailId": formData.emailId,
        "contactNo": formData.contactNo,
        "gender": 0,
        "resumePath": this.resumePath,
        "isApproved": 0
      }

      this.apiService.setHttp('POST', 'AppliedMember', false, JSON.stringify(obj), false, 'stplUrl');
      this.apiService.getHttp().subscribe((res: any) => {
        if (res.statusCode == "200") {
          this.toastrService.success(res.statusMessage);
          this.defaultApplayJobForm();
          this.submitted = false;
          this.resumeSubmit = false;
          this.jobDetailModel.nativeElement.click();
        } else {
          this.toastrService.error(res.statusMessage);
        }
      }, (error: any) => {
        this.errorSerivce.handelError(error.status);
      });
    }
  }

  clearForm() {
    this.submitted = false;
    this.defaultApplayJobForm();
    this.fileInput.nativeElement.value = '';
    this.resumeSubmit = false;
  }

  //................................... Resume Upload code Start Here...............................//

  resumeUpload(event: any) { //Single Image Upload
    let documentUrl: any = this.fileUploadService.uploadDocuments(event, "Resume", "png,jpg,jpeg,pdf", 5, 5000);
    documentUrl.subscribe({
      next: (ele: any) => {
        this.resumePath = ele.responseData;
        // this.pageMasterForm.value.homeImagePath = this.homePageImgPath;
      },
    })
  }

  deleteResume(){
    this.resumePath = '';
    this.fileInput.nativeElement.value = '';
  }

    //................................... Resume Upload code End Here...............................//

}
