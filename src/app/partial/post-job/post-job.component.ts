import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { NgxSpinnerService } from 'ngx-spinner';

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

  editorConfig = this.commonService.editorConfig;
  PostJobForm!: FormGroup | any;
  jobPostArray: any;
  pageNumber: number = 1;
  pagesize: number = 10;
  totalRows: any;
  submitted = false;
  allCategoryArray: any;
  jobLocationArray: any;
  durationArray: any;
  employementArray: any;
  deletePostId: any;
  HighlightRow!: number;
  @ViewChild('addNewJobModel') addNewJobModel:any; 
  btnText = 'Add New Job';
  Max = new Date();
  qualificationArray: any;
  searchQualificationData = '';
  skillSetArray: any;
  searchSkillSetData = '';
  skillModelArray: any = [];
  qualiModelArray: any = [];

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public dateTimeAdapter: DateTimeAdapter<any>) {
    { dateTimeAdapter.setLocale('en-IN'); }
  }

  ngOnInit() {
    this.defaultForm();
    this.getJobPost();
  }

  get f() { return this.PostJobForm.controls }

  defaultForm() {
    this.PostJobForm = this.fb.group({
      Id: [0],
      jobTitle: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z-(),.0-9\\s]+$')]],
      jobDescription: ['', Validators.required],
      jobCategory: ['', Validators.required],
      jobLocation: ['', Validators.required],
      jobPostEndDate: ['', Validators.required],
      experienceFromYr: ['', Validators.required],
      experienceToYr: ['', Validators.required],
      role_Responsbility: ['', Validators.required],
      joiningPeriod: ['', Validators.required],
      employmentType: ['', Validators.required],
      qualificationId : ['', Validators.required],
      skillId : ['', Validators.required],
    })
  }

  clearForm() {
    this.submitted = false;
    this.defaultForm();
    this.btnText = 'Add New Job';
  }

  addNewData() {
    this.getAllCategory();
    this.getAllJobLocation();
    this.getAllDuration();
    this.getAllEmployement();
    this.getAllQualification();
    this.getAllSkillSet();
  }

  getAllCategory() {
    this.apiService.setHttp('get', "Master/GetAllCategory", false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.allCategoryArray = res.responseData;
        } else {
          this.allCategoryArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  getAllJobLocation() {
    this.apiService.setHttp('get', "Master/GetAllJobLocation", false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.jobLocationArray = res.responseData;
        } else {
          this.jobLocationArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  getAllDuration() {
    this.apiService.setHttp('get', "Master/GetAllDuration", false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.durationArray = res.responseData;
        } else {
          this.durationArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  getAllEmployement() {
    this.apiService.setHttp('get', "Master/GetAllEmployement", false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.employementArray = res.responseData;
        } else {
          this.employementArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  getAllSkillSet() {
    this.apiService.setHttp('get', "Master/GetAllSkills", false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.skillSetArray = res.responseData;
        } else {
          this.skillSetArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  getAllQualification() {
    this.apiService.setHttp('get', "Master/GetAllQualification", false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.qualificationArray = res.responseData;
        } else {
          this.qualificationArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  getJobPost() {
    this.spinner.show();
    let obj = "pageno=" + this.pageNumber + "&pagesize=" + this.pagesize;
    this.apiService.setHttp('get', "JobPost/GetAll?" + obj, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.spinner.hide();
          this.jobPostArray = res.responseData.responseData1;
          this.totalRows = res.responseData.responseData2.totalPages * this.pagesize;
        } else {
          this.spinner.hide();
          this.jobPostArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  onClickPagintion(pageNo: any) {
    this.pageNumber = pageNo;
    this.getJobPost();
  }

  changeStatus(event: any) {
    console.log(event.target.checked)
  }

  onSubmit() {
    let formData = this.PostJobForm.value;
    this.submitted = true;
    if (this.PostJobForm.invalid) {
      return;
    } else {

      let id: any;
      formData.Id ? id = formData.Id : id = 0;

      let obj = {
        "createdBy": 0,
        "modifiedBy": 0,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": true,
        "id": id,
        "jobTitle": formData.jobTitle,
        "jobDescription": formData.jobDescription,
        "jobCategory": formData.jobCategory,
        "jobLocation": formData.jobLocation,
        "jobPostDate": new Date(),
        "jobPostEndDate": formData.jobPostEndDate,
        "experienceFromYr": formData.experienceFromYr,
        "experienceToYr": formData.experienceToYr,
        "qualificationId": 0,
        "role_Responsbility": formData.role_Responsbility,
        "joiningPeriod": formData.joiningPeriod,
        "employmentType": formData.employmentType,
        "isActive": true,
        "skillModels": this.skillModelArray,
        "qualifications": this.qualiModelArray,
      }
      let urlType;
      id == 0 ? urlType = 'POST' : urlType = 'PUT'
      this.apiService.setHttp(urlType, 'JobPost/AddJobPost', false, JSON.stringify(obj), false, 'stplUrl');
      this.apiService.getHttp().subscribe((res: any) => {
        if (res.statusCode == "200") {
          this.toastrService.success(res.statusMessage);
          this.clearForm();
          this.addNewJobModel.nativeElement.click();
          this.getJobPost();
        } else {
          this.toastrService.error(res.statusMessage);
        }
      }, (error: any) => {
        this.errorSerivce.handelError(error.status);
      });
      this.clearForm();
    }
  }

  updateJobPost(obj:any){
    let expFromYr = obj?.experience.split('-')[0];
    let expToYr = obj?.experience.split('-')[1];
    this.addNewData();
    this.HighlightRow = obj.id;
    this.btnText = 'Update New Job';
    this.PostJobForm.patchValue({
      Id: obj.id,
      jobTitle: obj.jobTitle,
      jobDescription: obj.jobDescription ,
      jobCategory: obj.jobCategory ,
      jobLocation: obj.jobLocation ,
      jobPostEndDate: obj.jobPostEndDate ,
      experienceFromYr: expFromYr,
      experienceToYr: expToYr ,
      role_Responsbility: obj.role_Responsbility ,
      joiningPeriod: obj.joiningPeriod ,
      employmentType: obj.employmentType ,
    })
  }

  deleteConformation(id: any) {
    this.HighlightRow = id;
    this.deletePostId = id;
  }

  deleteJobPost() {
    let obj = { "id": parseInt(this.deletePostId) }
    this.apiService.setHttp('DELETE', "JobPost/DeleteJobPost", false, JSON.stringify(obj), false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.toastrService.success(res.statusMessage);
          this.getJobPost();
        } else {
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }
  
  onCheckChangeQualification(event: any, qualificationId:any) {
    // event.target.checked

    this.qualiModelArray
   
  }

  onCheckChangeSkillSet(event: any, skillSetId:any) {
    // event.target.checked   skillModelArray: any = [];
   
  }

}
