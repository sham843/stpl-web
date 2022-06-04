import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-page-masters',
  templateUrl: './page-masters.component.html',
  styleUrls: ['./page-masters.component.css']
})
export class PageMastersComponent implements OnInit {

  editorConfig = this.commonService.editorConfig;
  pageMasterForm!: FormGroup | any;
  pageCategoryArray: any;
  pageNumber: number = 1;
  pagesize: number = 10;
  totalRows: any;
  submitted = false;
  btnText = 'Submit';
  pageMasterGetAllArray:any;
  HighlightRow!: number;
  deleteMasterId:any;
  pageMasterImagArray:any[] = [];
  checkedDataflag: boolean = true;
  @ViewChild('fileInput') fileInput!: ElementRef;
  homePageImgPath:any
  @ViewChild('homeImgFileInput') homeImgFileInput!: ElementRef;
  homeValueSubmitted = false;
  hideColorDiv:boolean = false;

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private localStorage:LocalstorageService,
    private fileUploadService:FileUploadService,
    ) {
  }

  ngOnInit() {
    this.defaultForm();
    this.getPageCategory();
    this.getPageMasterGetAll();
  }

  get f() { return this.pageMasterForm.controls }

  defaultForm() {
    this.pageMasterForm = this.fb.group({
      Id: [0],
      pageName: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      pageCategoryId: ['', Validators.required],
      about: ['', Validators.required],
      features: ['', Validators.required],
      imagePath: [''],
      colorCode: [''],
      colorValue: [''],
      homeImagePath:[''],
    })
  }

  addValidation(flag:any){
    this.hideColorDiv = false;
    if (flag == 2) {
      this.hideColorDiv = true;
      this.pageMasterForm.controls["colorValue"].setValidators(Validators.required);
      this.pageMasterForm.controls["colorValue"].updateValueAndValidity();
    }else{
      this.hideColorDiv = false;
      this.pageMasterForm.controls['colorValue'].clearValidators();
      this.pageMasterForm.controls["colorValue"].updateValueAndValidity();
    }
  }

  clearForm() {
    this.submitted = false;
    this.defaultForm();
    this.btnText = 'Submit';
    this.pageMasterImagArray = [];
    this.HighlightRow = 0;
    this.homePageImgPath = '';
    this.homeValueSubmitted = false;
    this.hideColorDiv = false;
  }

  getPageCategory() {
    this.apiService.setHttp('get', "Master/GetPageCategory", false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.pageCategoryArray = res.responseData;
        } else {
          this.pageCategoryArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  getPageMasterGetAll() {
    this.spinner.show();
    let obj = "pageno=" + this.pageNumber + "&pagesize=" + this.pagesize;
    this.apiService.setHttp('get', "PageMaster/GetAll?" + obj, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.spinner.hide();
          this.pageMasterGetAllArray = res.responseData.responseData1;
          this.totalRows = res.responseData.responseData2.totalPages * this.pagesize;
        } else {
          this.spinner.hide();
          this.pageMasterGetAllArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  onClickPagintion(pageNo: any) {
    this.pageNumber = pageNo;
    this.getPageMasterGetAll();
    this.clearForm();
  }

  onSubmit() {
    let formData = this.pageMasterForm.value;
    this.submitted = true;
    this.homeValueSubmitted = true;
    if (this.commonService.checkDataType(this.homePageImgPath) == false) {
      // this.homeValueSubmitted = true;
      return
    } 
    if (this.pageMasterForm.invalid) {
      return;
    }else if (this.commonService.checkDataType(this.pageMasterImagArray) == false) {
      this.toastrService.error('Please Select Upload Image Field');
    } else { 

      let id: any;
      formData.Id ? id = formData.Id : id = 0;
      
      let obj = {
        "createdBy": this.localStorage.userId(),
        "modifiedBy": this.localStorage.userId(),
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": true,
        "id": id,
        "pageName": formData.pageName,
        "pageCategoryId": formData.pageCategoryId,
        "about": formData.about,
        "features": formData.features,
        "pageMasters": this.pageMasterImagArray,
        "color": formData.colorValue,
        "homeImagePath": this.homePageImgPath,
      }
      this.spinner.show();
      let urlType;
      id == 0 ? urlType = 'POST' : urlType = 'PUT'
      this.apiService.setHttp(urlType, 'PageMaster', false, JSON.stringify(obj), false, 'stplUrl');
      this.apiService.getHttp().subscribe((res: any) => {
        if (res.statusCode == "200") {
          this.spinner.hide();
          this.toastrService.success(res.statusMessage);
          this.clearForm();
          this.getPageMasterGetAll();
        } else {
          this.toastrService.error(res.statusMessage); this.spinner.hide();
        }
      }, (error: any) => {
        this.errorSerivce.handelError(error.status); this.spinner.hide();
      });
      this.clearForm();
    }
  }

  updatePageMaster(obj:any){
    this.pageMasterImagArray = obj?.pageMasters;
    this.homePageImgPath = obj?.homeImagePath;
    this.HighlightRow = obj?.id;
    this.btnText = 'Update';
    this.addValidation(obj?.pageCategoryId)
    this.pageMasterForm.patchValue({
      Id: obj.id,
      pageName: obj.pageName,
      pageCategoryId: obj.pageCategoryId ,
      about: obj.about ,
      features: obj.features ,
      colorValue:obj.color,
    })
  }

  deleteConformation(id: any) {
    this.HighlightRow = id;
    this.deleteMasterId = id;
  }

  deletePageMaster() {
    let obj = {
      "id": parseInt(this.deleteMasterId),
      "modifiedBy": this.localStorage.userId(),
      "modifiedDate": new Date()
    }
    this.apiService.setHttp('DELETE', "PageMaster", false, JSON.stringify(obj), false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.toastrService.success(res.statusMessage);
          this.getPageMasterGetAll();
          this.clearForm();
        } else {
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  imageUpload(event: any) { //multiple Image Upload
    let documentUrlUploaed:any;
    let documentUrl: any = this.fileUploadService.uploadDocuments(event, "MasterImages", "png,jpg,jpeg", 5, 5000);
    documentUrl.subscribe({
      next: (ele: any) => {
        documentUrlUploaed = ele.responseData;
        if (documentUrlUploaed != null) {
        let obj = {
          "pageId": 0,
          "imagePath": documentUrlUploaed,
          "isDeleted": true
        }
        this.checkUniqueData(obj,documentUrlUploaed);
      }
      },
    })
    this.pageMasterForm.controls['imagePath'].setValue('');
  }

  checkUniqueData(obj: any,urlPath:any) { //Check Unique Data then Insert or Update
    this.checkedDataflag = true;
    if (this.pageMasterImagArray.length <= 0) {
      this.pageMasterImagArray.push(obj);
      this.checkedDataflag = false;
    } else {
      this.pageMasterImagArray.map((ele: any, index: any) => {
        if (ele.imagePath == urlPath) {
          this.pageMasterImagArray[index] = obj;
          this.checkedDataflag = false;
        }
      })
    }
    this.checkedDataflag && this.pageMasterImagArray.length >= 1 ? this.pageMasterImagArray.push(obj) : '';
  }

  deleteImage(index:any){
    this.pageMasterImagArray.splice(index, 1);
    this.fileInput.nativeElement.value = '';
  }

  selectColor(){
    this.pageMasterForm.controls['colorValue'].setValue(this.pageMasterForm.value.colorCode);
  }

  homePageImgUpload(event: any) { //Single Image Upload
    let documentUrl: any = this.fileUploadService.uploadDocuments(event, "MasterImages", "png,jpg,jpeg", 5, 5000);
    documentUrl.subscribe({
      next: (ele: any) => {
        this.homePageImgPath = ele.responseData;
        // this.pageMasterForm.value.homeImagePath = this.homePageImgPath;
      },
    })
    this.pageMasterForm.controls['homeImagePath'].setValue('');
  }

  deleteHomePageImg(){
    this.homePageImgPath = '';
    // this.pageMasterForm.controls['homeImagePath'].setValue('');
    this.homeImgFileInput.nativeElement.value = '';
  }

}
