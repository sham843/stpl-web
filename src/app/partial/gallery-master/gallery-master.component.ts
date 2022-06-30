import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { DateTimeAdapter } from 'ng-pick-datetime';

@Component({
  selector: 'app-gallery-master',
  templateUrl: './gallery-master.component.html',
  styleUrls: ['./gallery-master.component.css']
})
export class GalleryMasterComponent implements OnInit {

  galleryMasterForm!: FormGroup | any;
  pageNumber: number = 1;
  pagesize: number = 10;
  totalRows: any;
  submitted = false;
  btnText = 'Submit';
  galleryMasterGetArray: any;
  HighlightRow!: number;
  galleryImagArray: any[] = [];
  galleryImagArray1: any[] = [];
  checkedDataflag: boolean = true;
  @ViewChild('fileInput') fileInput!: ElementRef;
  deleteGalleryId: any;
  Min = new Date();

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private localStorage: LocalstorageService,
    private fileUploadService: FileUploadService,
    public dateTimeAdapter: DateTimeAdapter<any>) {
      { dateTimeAdapter.setLocale('en-IN'); }
    }

  ngOnInit() {
    this.defaultForm();
    this.getGalleryMaster();
  }

  get f() { return this.galleryMasterForm.controls }

  defaultForm() {
    this.galleryMasterForm = this.fb.group({
      Id: [0],
      eventName: ['', [Validators.required, Validators.maxLength(100)]],
      eventDate: ['', Validators.required],
      eventDescription: ['', Validators.required],
      imagePath: [''],
    })
  }

  clearForm() {
    this.submitted = false;
    this.defaultForm();
    this.btnText = 'Submit';
    this.galleryImagArray = [];
    this.HighlightRow = 0;
  }

  getGalleryMaster() { 
    this.spinner.show();
    let obj = "pageno=" + this.pageNumber + "&pagesize=" + this.pagesize;
    this.apiService.setHttp('get', "GallaryMaster/GetAll?" + obj, false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.spinner.hide();
          this.galleryMasterGetArray = res.responseData.responseData1;
          this.totalRows = res.responseData.responseData2.totalPages * this.pagesize;
        } else {
          this.spinner.hide();
          this.galleryMasterGetArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  onClickPagintion(pageNo: any) {
    this.pageNumber = pageNo;
    this.getGalleryMaster();
    this.clearForm();
  }

  onSubmit() {
    let formData = this.galleryMasterForm.value;
    this.submitted = true;
    if (this.galleryMasterForm.invalid) {
      return;
    } else if (this.commonService.checkDataType(this.galleryImagArray) == false) {
      this.toastrService.error('Please Select Upload Image Field');
    } else {

      let id: any;
      formData.Id ? id = formData.Id : id = 0;

      let obj = {
        "createdBy": this.localStorage.userId(),
        "modifiedBy": this.localStorage.userId(),
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": false,
        "id": id,
        "eventName": formData.eventName,
        "eventDate": formData.eventDate,
        "eventDescription": formData.eventDescription,
        "gallaryMasters": this.galleryImagArray
      }

      this.spinner.show();
      let urlType;
      id == 0 ? urlType = 'POST' : urlType = 'PUT'
      this.apiService.setHttp(urlType, 'GallaryMaster', false, JSON.stringify(obj), false, 'stplUrl');
      this.apiService.getHttp().subscribe((res: any) => {
        if (res.statusCode == "200") {
          this.spinner.hide();
          this.toastrService.success(res.statusMessage);
          this.clearForm();
          this.getGalleryMaster();
        } else {
          this.toastrService.error(res.statusMessage); this.spinner.hide();
        }
      }, (error: any) => {
        this.errorSerivce.handelError(error.status); this.spinner.hide();
      });
      this.clearForm();
    }
  }

  updateGalleryMaster(obj: any) {
    this.galleryImagArray = [...obj?.gallaryMasters];
    this.HighlightRow = obj?.id;
    this.btnText = 'Update';
    this.galleryMasterForm.patchValue({
      Id: obj?.id,
      eventName: obj?.eventName,
      eventDate: obj?.eventDate,
      eventDescription: obj?.eventDescription,
    })
  }

  deleteConformation(id: any) {
    this.HighlightRow = id;
    this.deleteGalleryId = id;
  }

  deleteGalleryMaster() {
    let obj = {
      "id": parseInt(this.deleteGalleryId),
      "modifiedBy": this.localStorage.userId(),
      "modifiedDate": new Date()
    }
    this.apiService.setHttp('DELETE', "GallaryMaster", false, JSON.stringify(obj), false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.toastrService.success(res.statusMessage);
          this.getGalleryMaster();
          this.clearForm();
        } else {
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  imageUpload(event: any) { //multiple Image Upload
    let documentUrlUploaed: any;
    let documentUrl: any = this.fileUploadService.uploadDocuments(event, "GalleryUploads", "png,jpg,jpeg", 5, 5000);
    documentUrl.subscribe({
      next: (ele: any) => {
        documentUrlUploaed = ele.responseData;
        if (documentUrlUploaed != null) {
          let obj = 
          {
            "eventId": 0,
            "imagePath": documentUrlUploaed,
            "isDeleted": false
          }
          this.checkUniqueData(obj, documentUrlUploaed);
        }
      },
    })
    this.galleryMasterForm.controls['imagePath'].setValue('');
  }

  checkUniqueData(obj: any, urlPath: any) { //Check Unique Data then Insert or Update
    this.checkedDataflag = true;
    if (this.galleryImagArray.length <= 0) {
      this.galleryImagArray.push(obj);
      this.checkedDataflag = false;
    } else {
      this.galleryImagArray.map((ele: any, index: any) => {
        if (ele.imagePath == urlPath) {
          this.galleryImagArray[index] = obj;
          this.checkedDataflag = false;
        }
      })
    }
    this.checkedDataflag && this.galleryImagArray.length >= 1 ? this.galleryImagArray.push(obj) : '';
  }

  deleteImage(index: any) {
    this.galleryImagArray.splice(index, 1);
    this.fileInput.nativeElement.value = '';
  }

}
